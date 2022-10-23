import 'package:feather_icons/feather_icons.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:select_launcher/util/colors.dart';
import 'package:select_launcher/widgets/appbar.dart';
import 'package:select_launcher/widgets/bounce_button.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  Widget buildLogin() {
    return Center(
      child: Container(
        // Account Background
        decoration: BoxDecoration(
          color: secondaryBg,
          borderRadius: BorderRadius.circular(5),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.5),
              spreadRadius: 0,
              blurRadius: 10,
              offset: const Offset(0, 10), // changes position of shadow
            ),
          ],
        ),
        height: 470,
        width: 444,
        child: Column(
          children: [
            // Account Strip
            Container(
              height: 50,
              width: double.infinity,
              decoration: BoxDecoration(
                color: tertiaryBg,
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(5),
                  topRight: Radius.circular(5),
                ),
              ),
              child: Center(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    const Icon(
                      FeatherIconsSnakeCase.user,
                      color: Colors.white,
                      size: 30.0,
                      semanticLabel: 'Create Account',
                    ),
                    const SizedBox(width: 5),
                    Text(
                      'Account',
                      style: GoogleFonts.montserrat(
                        textStyle: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 30.0,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 40),
            Container(
              padding: const EdgeInsets.only(left: 20, right: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    height: 50,
                    child: Text(
                      'We are so glad to have you!',
                      style: GoogleFonts.montserrat(
                        textStyle: const TextStyle(
                          fontWeight: FontWeight.w600,
                          fontSize: 20.0,
                        ),
                      ),
                    ),
                  ),
                  Text(
                    'Username',
                    style: GoogleFonts.montserrat(
                      textStyle: const TextStyle(
                        fontWeight: FontWeight.w400,
                        fontSize: 16.0,
                      ),
                    ),
                  ),
                  const SizedBox(height: 10),
                  TextField(
                    obscureText: false,
                    decoration: InputDecoration(
                      hintText: 'Jack Mehoff',
                      hintStyle: GoogleFonts.montserrat(
                        textStyle: const TextStyle(
                          fontWeight: FontWeight.w400,
                          fontSize: 16.0,
                          color: Colors.white,
                        ),
                      ),
                      fillColor: tertiaryBg,
                      focusColor: primary,
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                          color: tertiaryBg,
                          width: 0.0,
                        ),
                        borderRadius: BorderRadius.circular(10.0),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: primary, width: 2.0),
                        borderRadius: BorderRadius.circular(10.0),
                      ),
                      filled: true,
                    ),
                  ),
                  const SizedBox(height: 20),
                  Text(
                    'Password',
                    style: GoogleFonts.montserrat(
                      textStyle: const TextStyle(
                        fontWeight: FontWeight.w400,
                        fontSize: 16.0,
                      ),
                    ),
                  ),
                  const SizedBox(height: 10),
                  TextField(
                    obscureText: true,
                    decoration: InputDecoration(
                      suffixIconColor: tertiaryBg,
                      hintText: '1234',
                      hintStyle: GoogleFonts.montserrat(
                        textStyle: const TextStyle(
                          fontWeight: FontWeight.w400,
                          fontSize: 16.0,
                          color: Colors.white,
                        ),
                      ),
                      fillColor: tertiaryBg,
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                          color: tertiaryBg,
                          width: 0.0,
                        ),
                        borderRadius: BorderRadius.circular(10.0),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: primary, width: 2.0),
                        borderRadius: BorderRadius.circular(10.0),
                      ),
                      filled: true,
                    ),
                  ),
                  const SizedBox(height: 20),
                  Center(
                    child: SizedBox(
                      height: 50,
                      width: 140,
                      child: BounceButton(
                        buttonColor: primary,
                        buttonContent: 'Submit',
                        buttonOnPress: () {},
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'No account?',
                        style: GoogleFonts.montserrat(
                          textStyle: const TextStyle(
                            fontWeight: FontWeight.w600,
                            fontSize: 16.0,
                            color: Colors.white,
                          ),
                        ),
                      ),
                      TextButton(
                        style: ElevatedButton.styleFrom(
                          splashFactory: NoSplash.splashFactory,
                        ),
                        onPressed: () {},
                        child: Text(
                          'Create One!',
                          style: GoogleFonts.montserrat(
                            textStyle: TextStyle(
                              fontWeight: FontWeight.w600,
                              fontSize: 16.0,
                              color: primary,
                              decoration: TextDecoration.underline,
                            ),
                          ),
                        ),
                      )
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: SelectAppBar(),
      body: buildLogin(),
    );
  }
}
