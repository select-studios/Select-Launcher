use reqwest::header::{ACCEPT, AUTHORIZATION, USER_AGENT};
use semver::{Version, VersionReq};
use std::fs::{metadata, File};
use std::io::{copy, Cursor, Read};
use std::path::PathBuf;
use std::process::Command;
use std::{env, fs};

use crate::update_functions::release_schema::Release;

pub fn check_for_updates(version: &str) {
    println!("Killing launcher");
    Command::new("taskkill")
        .args(["/IM", "Select Launcher.exe", "/F"])
        .spawn()
        .expect("failed to kill launcher");
    println!("Starting updates");
    cleanup_previous_install();
    let client = reqwest::blocking::Client::new();
    let current_ver = VersionReq::parse(version).unwrap();
    let releases = client
        .get("https://api.github.com/repos/select-studios/Select-Launcher/releases")
        .header(ACCEPT, "application/vnd.github+json")
        .header(AUTHORIZATION, "Bearer [TOKEN]")
        .header(USER_AGENT, "Select-Launcher")
        .send()
        .expect("could not send request")
        .json::<Release>()
        .expect("failed to parse to json");

    for release in releases.iter() {
        let parsed_ver = Version::parse(&release.tag_name.replace("v", "")).unwrap();
        if current_ver.matches(&parsed_ver) {
            for asset in release.assets.iter() {
                if asset.content_type == String::from("application/x-zip-compressed") {
                    download_update(
                        &asset.browser_download_url,
                        &release.tag_name.replace("v", ""),
                    );
                }
            }
        }
    }
}

fn cleanup_previous_install() {
    println!("removing previous install");
    let files =
        fs::read_dir(env::current_dir().unwrap()).expect("failed to get previous install files");

    for file in files {
        if file.as_ref().unwrap().file_type().unwrap().is_file() {
            if file.as_ref().unwrap().file_name().to_str().unwrap() == "updater.exe" {
                return;
            } else {
                fs::remove_file(
                    env::current_dir()
                        .unwrap()
                        .join(file.as_ref().unwrap().file_name().to_str().unwrap()),
                )
                .expect("could not erase previous install file");
            }
        } else if file.as_ref().unwrap().file_type().unwrap().is_dir() {
            fs::remove_dir_all(file.as_ref().unwrap().path())
                .expect("failed to remove previous install directory");
        }
    }
}

fn download_update(download_url: &String, version: &String) {
    println!("downloading update");
    let downloaded_release = reqwest::blocking::get(download_url).expect("request failed");
    let body = Cursor::new(downloaded_release.bytes().expect("body invalid"));
    let mut out_file = File::create(env::current_dir().unwrap().join(format!("{}.zip", version)))
        .expect("failed to create file");
    copy(&mut body.clone(), &mut out_file).unwrap();
    extract_update(&version)
}

fn extract_update(version: &String) {
    println!("extracting update");
    let mut file = File::open(env::current_dir().unwrap().join(format!("{}.zip", version)))
        .expect("failed to read zip");
    let metadata = metadata(env::current_dir().unwrap().join(format!("{}.zip", version)))
        .expect("unable to read metadata");
    let mut buffer = vec![0; metadata.len() as usize];
    file.read(&mut buffer).expect("buffer overflow");

    zip_extract::extract(
        Cursor::new(buffer),
        &PathBuf::from(env::current_dir().unwrap()),
        true,
    )
    .expect("failed to extract zip");
    cleanup_update(version);
}

fn cleanup_update(version: &String) {
    println!("Cleaning up update");
    fs::remove_file(env::current_dir().unwrap().join(format!("{}.zip", version)))
        .expect("failed to remove zip file");
    Command::new("cmd")
        .args(&["/C", "start", "", "./Select Launcher.exe"])
        .spawn()
        .unwrap();
}
