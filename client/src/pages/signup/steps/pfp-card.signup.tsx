import { Stepper } from "@/components/stepper/stepper.component";
import { API_URI } from "@/handlers/api";
import { UserStore } from "@/stores/UserStore";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Slider,
  User,
} from "@nextui-org/react";
import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface IProps {}

/**
 * @author
 * @function @SignupPfpCard
 **/

const greetings = [
  "Sup?",
  "Cooking?",
  "Wyd?",
  "Hru?",
  "Lookin' hot.",
  "Lookin' good.",
];

export const SignupPfpCard: FC<IProps> = (props) => {
  const user = UserStore.user;
  const { username, password, email } = user || {};
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | ArrayBuffer | null>();

  const convertToBase64 = (e: any) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const navigate = useNavigate();

  const editPfp = () => {
    setLoading(true);
    console.log(image);
    fetch(`${API_URI}/accounts/account/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.tokens.accessToken}`,
      },
      body: JSON.stringify({ username, password, email, pfp: image }),
    })
      .then((res) => res.json())
      .then((body) => {
        UserStore.setUser(body.newUser);
        setLoading(false);
        return navigate("/store");
      });
  };

  return (
    <main>
      <div className="mt-20 grid justify-center items-center">
        <div className="mx-auto">
          <Stepper
            steps={[
              { label: "Fill-in Details", done: true },
              { label: "Customize Profile", done: false },
            ]}
          />
        </div>

        <Card isBlurred className="z-10 bg-content1 px-10 bg-opacity-50 mt-10">
          <CardHeader className="grid justify-center mb-2">
            <h1 className="text-4xl font-heading mt-5 text-center">
              Profile Customization
            </h1>
            <p className="mt-4 text-center font-semibold opacity-70 text-base">
              this is the part where you make your profile look really good.
            </p>{" "}
          </CardHeader>
          <CardBody className="my-5">
            <div className="grid justify-center bg-content1 py-5 rounded-2xl shadow-md backdrop-blur-md px-5">
              <div className="flex items-center">
                <Avatar
                  className="w-28 h-28 text-4xl uppercase"
                  name={user?.username}
                  src={(image as string) || ""}
                />{" "}
                <div className="ml-5">
                  <p className="font-heading text-2xl">
                    @{user?.username},{" "}
                    {greetings[Math.floor(Math.random() * greetings.length)]}
                  </p>
                  {image ? (
                    <span className="mt-2 text-bold text-sm text-success">
                      Lookin' good!
                    </span>
                  ) : (
                    <span className="mt-2 text-bold text-sm opacity-80">
                      Consider setting up a profile picture.
                    </span>
                  )}
                  <div className="grid">
                    <Button
                      className="mt-5 w-fit"
                      color={image ? "default" : "primary"}
                      variant="shadow"
                    >
                      <label className="cursor-pointer" htmlFor="pfp-upload">
                        <input
                          accept="image/*"
                          type="file"
                          className="hidden"
                          id="pfp-upload"
                          onChange={convertToBase64}
                        />{" "}
                        {image ? "Change" : "Edit"} Avatar
                      </label>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <Button
              isLoading={loading}
              color={image ? "primary" : "default"}
              variant={image ? "shadow" : "solid"}
              onClick={() => {
                if (image) editPfp();
                else navigate("/store");
              }}
            >
              {image ? "Next" : "Skip"}
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="area">
        {" "}
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </main>
  );
};
