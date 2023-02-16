// use super::releaseSchema::ReleaseElement;
// use semver::{BuildMetadata, Prerelease, Version, VersionReq};
// use std::collections::HashMap;
// use std::env;
// use std::fs;
// use std::path::Path;

pub async fn check_for_updates() -> Result<(), Box<dyn std::error::Error>> {
    // let versionTxtContent = fs::read_to_string(Path.join(env::current_dir()).join("version.txt"));
    // let currentVer = VersionReq::parse(versionTxtContent).unwrap();
    let latestVersion =
        reqwest::get("https://api.github.com/repos/select-studios/Select-Launcher/releases")
            .await?;
    println!("latest version {}", latestVersion.text().await?);
    return Ok(());
}
