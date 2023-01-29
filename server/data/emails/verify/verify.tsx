import { Button } from "@react-email/button";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Html } from "@react-email/html";
import { Img } from "@react-email/img";
import { Link } from "@react-email/link";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";
import * as React from "react";

interface EmailProps {
  username: string;
  url: string;
}

export default function Email({ username, url }: EmailProps) {
  return (
    <Html>
      <Head />
      <Section style={main}>
        <Container style={container}>
          <Img
            src={
              "https://cdn.discordapp.com/attachments/690160218159710413/1069193293994414171/Select_Launcher_Logo.png"
            }
            width="40"
            height="33"
            alt="Select Studios"
          />
          <Section>
            <Text style={text}>Hey {username},</Text>
            <Text style={text}>
              It is our pleasure that you recently registered for a Select
              Studios account. <bold>Epic gamer move, innit?</bold> <br />{" "}
              However, we need to verify your email before you actually start
              playing due to obvious reasons. <br />
              TLDR; just click the button below to verify your account.
            </Text>
            <Button style={button} href={url}>
              Verify Account
            </Button>
            <Text style={text}>
              If you did not register for a Select Studios account, you can
              safely ignore this email.
            </Text>
            <Text style={text}>
              To keep your account secure, please don&apos;t forward this email
              to anyone.
            </Text>
            <Text style={text}>Happy Gaming!</Text>
          </Section>
        </Container>
      </Section>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  margin: "0 auto",
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  width: "600px",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#9980FA",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};
