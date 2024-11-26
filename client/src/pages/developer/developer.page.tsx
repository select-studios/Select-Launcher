import { AppBar, Sidebar } from "@/components";
import { observer } from "mobx-react";
import React, { FC, useEffect } from "react";
import "./developer.style.css";
import { Button, Chip, Image } from "@nextui-org/react";
import { FloatingSquares } from "@/components/images/floatingsquares.component";

interface IProps {}

/**
 * @author
 * @function @Developer
 **/

import img from "../../assets/images/ICON_Develop.gif";
import { Link } from "react-router-dom";
import { HiCode } from "react-icons/hi";

const DeveloperComp: FC<IProps> = (props) => {
  return (
    <main className="developer">
      <div className="flex h-screen overflow-y-scroll">
        <div className="flex justify-center z-50 items-center mb-10 mx-auto">
          {/* <Image src={img} className="w-64 h-64 mr-5" /> */}
          <HiCode
            size={256}
            className="mr-10 bg-primary text-primary shadow-sm mt-5 rounded-2xl p-5 bg-opacity-10 backdrop-blur-sm"
          />

          <div>
            <p className="text-5xl font-heading text-left mt-5">
              SHOW US WHAT{" "}
              <span className="bg-gradient-to-r from-purple-500 to-blue-400 inline-block text-transparent bg-clip-text">
                YOU
              </span>{" "}
              GOT.
            </p>

            <div className="buttons flex items-center justify-start mt-10">
              <Link to="/developer/index">
                <Button
                  size="lg"
                  variant="flat"
                  className="backdrop-blur-lg"
                  color="primary"
                >
                  Get Started
                </Button>
              </Link>

              {/* <Chip
                size="lg"
                color="primary"
                className="py-6"
                variant="flat"
                radius="md"
              >
                <p className="uppercase font-heading">coming soon</p>
              </Chip> */}
              <Link to={"/store"}>
                <Button size="lg" variant="flat" className="ml-5">
                  Go Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <FloatingSquares />
    </main>
  );
};

export const Developer = observer(DeveloperComp);
