import 'package:feather_icons/feather_icons.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:select_launcher/src/api/login_api.dart';
import 'package:select_launcher/src/util/colors.dart';
import 'package:select_launcher/widgets/appbar.dart';
import 'package:select_launcher/widgets/bounce_button.dart';
import 'package:select_launcher/widgets/select_input.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  String username = '';
  String password = '';

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
                  SelectInput(
                    placeholder: 'Jack Mehoff',
                    obscureText: false,
                    onChanged: (value) {
                      setState(() {
                        username = value;
                      });
                    },
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
                  SelectInput(
                    placeholder: '1234',
                    obscureText: true,
                    onChanged: (value) {
                      setState(() {
                        password = value;
                      });
                    },
                  ),
                  const SizedBox(height: 20),
                  Center(
                    child: SizedBox(
                      height: 50,
                      width: 140,
                      child: BounceButton(
                        buttonColor: primary,
                        buttonContent: 'Submit',
                        buttonOnPress: () async {
                          login(username, password);
                          final prefs = await SharedPreferences.getInstance();

                          Navigator.of(context).pushNamed(
                            '/home',
                            arguments: prefs.get('username'),
                          );
                        },
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
