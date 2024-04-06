import { AppBar, Sidebar } from "@/components";
import { UserStore } from "@/stores/UserStore";
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  Button,
  Spinner,
  Link,
} from "@nextui-org/react";
import { FaFolderOpen } from "react-icons/fa";
import { FC, useState, useEffect } from "react";
import appInfo from "../../../package.json";
import { SidebarStore } from "@/stores/SidebarStore";
import { Octokit } from "octokit";
import Markdown from "react-markdown";
import config from "../../handlers/api/utils/data/config.json";

interface IProps {}

/**
 * @author
 * @function @Settings
 **/

export const Settings: FC<IProps> = (props) => {
  const { user } = UserStore;

  const [libraryLocation, setLibraryLocation] = useState<string>();
  const [releaseNotes, setReleaseNotes] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");

  useEffect(() => {
    SidebarStore.setOpen(true);
    setLibraryLocation(window.gamesAPI.getStorageLocation());

    const octokit = new Octokit({
      auth: config.token,
    });

    octokit
      .request(
        `GET /repos/select-studios/select-launcher/releases/tags/v${appInfo.version}`,
        {
          owner: "Select-Studios",
          repo: "select-launcher",
          tag: `v${appInfo.version}`,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      )
      .then((data: any) => {
        const { body, published_at } = data.data;
        setReleaseDate(published_at);
        setReleaseNotes(body);
      })
      .catch((err: any) => {
        setReleaseNotes("There was an error fetching the release notes.");
        setReleaseDate("There was an error.");
      });
  });

  const getBuildNumber = () => {
    const version = appInfo.version;
    const versionParts = version.split(".");

    return Number(versionParts[0]) * 1000 + Number(versionParts[1]) * 100;
  };

  return (
    <section className="settings">
      <div className="main flex">
        <Sidebar settings active="home" />
        <div className="content mt-5 mr-5 w-full">
          <AppBar settings pageName="Settings" />
          <div className="mt-12">
            <Card className="p-2">
              <CardHeader>
                <p className="font-heading tracking-wider text-xl uppercase">
                  General
                </p>
              </CardHeader>
              <CardBody>
                <Checkbox>Update app automatically</Checkbox>
                <Input
                  label="Download Location"
                  className="mt-10"
                  isReadOnly
                  value={libraryLocation}
                  endContent={
                    <Button
                      className="rounded-full mr-2 cursor-pointer w-6"
                      onClick={async () => {
                        let newLibraryPath = await window.filesAPI.openFolder();
                        if (newLibraryPath) {
                          window.gamesAPI.setStorageLocation(newLibraryPath);
                          setLibraryLocation(
                            window.gamesAPI.getStorageLocation()
                          );
                        }
                      }}
                    >
                      <FaFolderOpen size={20} />
                    </Button>
                  }
                />
              </CardBody>
            </Card>
            <Card className="mt-12 p-2">
              <CardHeader>
                <p className="font-heading tracking-wider text-xl uppercase">
                  App information
                </p>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-4">
                  <div className="bg-tertiaryBG rounded-lg px-4 py-2">
                    <p className="text-base font-heading uppercase">Version</p>
                    <p className="text-base">{appInfo.version}</p>
                  </div>
                  <div className="bg-tertiaryBG rounded-lg px-4 py-2 ml-2">
                    <p className="text-base font-heading uppercase">Build</p>
                    <p className="text-base">{getBuildNumber()}</p>
                  </div>
                  <div className="bg-tertiaryBG rounded-lg px-4 py-2 ml-2">
                    <p className="text-base font-heading uppercase">
                      Developer
                    </p>
                    <p className="text-base">Select Studios</p>
                  </div>
                  <div className="bg-tertiaryBG rounded-lg px-4 py-2 ml-2">
                    <p className="text-base font-heading uppercase">
                      Released on
                    </p>
                    <p className="text-base">{releaseDate}</p>
                  </div>
                </div>
                <div className="bg-tertiaryBG rounded-lg px-4 py-2 mt-5">
                  <p className="text-base font-heading uppercase">
                    What's Changed
                  </p>
                  <div className="mt-5">
                    {releaseNotes.length ? (
                      <div>
                        <Markdown className="prose whitespace-pre-wrap text-white">
                          {releaseNotes}
                        </Markdown>{" "}
                        <p className="mt-2 text-sm">
                          View this version's{" "}
                          <Link
                            className="text-sm"
                            href={`https://github.com/select-studios/select-launcher/releases/tag/v${appInfo.version}`}
                          >
                            GitHub Release
                          </Link>
                        </p>
                      </div>
                    ) : (
                      <Spinner />
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card className="mt-12 p-2">
              <CardHeader>
                <p className="font-heading tracking-wider text-xl uppercase">
                  Developer tools
                </p>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-4">
                  <div className="bg-tertiaryBG rounded-lg px-4 py-2">
                    <p className="text-base font-heading uppercase">User id</p>
                    <p className="text-base">{user?._id}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
