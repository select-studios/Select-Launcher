use reqwest::header::{ACCEPT, AUTHORIZATION, USER_AGENT};
use semver::{Version, VersionReq};
use std::fs::File;
use std::io::{copy, Cursor};

use crate::update_functions::release_schema::Release;

pub fn check_for_updates(version: &str) {
    println!("Starting updates");
    let client = reqwest::blocking::Client::new();
    let current_ver = VersionReq::parse(version).unwrap();
    let releases = client
        .get("https://api.github.com/repos/select-studios/Select-Launcher/releases")
        .header(ACCEPT, "application/vnd.github+json")
        .header(
            AUTHORIZATION,
            "Bearer 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",
        )
        .header(USER_AGENT, "Select-Launcher")
        .send()
        .expect("could not send request")
        .json::<Release>()
        .expect("could not convert to json");

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

fn download_update(download_url: &String, version: &String) {
    println!("downloading update");
    let downloaded_release = reqwest::blocking::get(download_url).expect("request failed");
    let body = Cursor::new(downloaded_release.bytes().expect("body invalid"));
    let mut out_file = File::create(format!("{}.zip", version)).expect("failed to create file");
    copy(&mut body.clone(), &mut out_file).unwrap();
}
