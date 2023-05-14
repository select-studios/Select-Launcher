import { Button } from "@react-email/button";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Html } from "@react-email/html";
import { Img } from "@react-email/img";
import { Link } from "@react-email/link";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";
import * as React from "react";

interface ForgotPasswordProps {
  username: string;
  newPass: string;
  url: string;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = (props) => {
  const { username, newPass, url } = props;

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
              We received a password reset request, if you have forgotten your
              password and you need a new one, press the button below to reset
              it!
            </Text>
            <Text style={text}>
              <b>New requested password: </b> {newPass}
            </Text>
            <Button style={button} href={url}>
              Confirm New Password
            </Button>
            <Text style={text}>
              If you are having trouble clicking the button, copy and paste the
              URL below into your web browser.
              {"\n" + url}
            </Text>
            <Text style={text}>
              If you did not request a new password, you can safely ignore this
              e-mail.
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
};

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
