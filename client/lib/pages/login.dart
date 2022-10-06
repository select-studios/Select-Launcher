import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:glassmorphism/glassmorphism.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  late double _height;
  late double _width;
  late String userName;
  late String password;

  Widget buildCardContent() {
    return Center(
      child: Column(
        children: <Widget>[
          const SizedBox(height: 50),
          const Image(
            image: AssetImage('assets/launcherIcon.png'),
            height: 120,
            width: 120,
          ),
          const Text(
            'Welcome Back!',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontFamily: 'Roboto',
              fontSize: 32,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 90),
          TextField(
            obscureText: false,
            decoration: const InputDecoration(
              border: OutlineInputBorder(),
              hintText: 'Username',
            ),
            onChanged: (currentUserName) {
              setState(() {
                userName = currentUserName;
              });
            },
          ),
          const SizedBox(height: 10),
          TextField(
            obscureText: true,
            decoration: const InputDecoration(
              border: OutlineInputBorder(),
              hintText: 'Password',
            ),
            onChanged: (currentPassword) {
              setState(() {
                password = currentPassword;
              });
            },
          ),
          const SizedBox(height: 30),
          Row(
            children: <Widget>[
              SizedBox(
                width: 213,
                child: ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color.fromARGB(255, 130, 141, 248),
                  ),
                  child: const Text('Sign In'),
                ),
              ),
              const SizedBox(width: 10),
              SizedBox(
                width: 213,
                child: OutlinedButton(
                  onPressed: () {},
                  style: OutlinedButton.styleFrom(
                    foregroundColor: const Color.fromARGB(255, 130, 141, 248),
                    side: const BorderSide(
                      width: 1,
                      color: Color.fromARGB(255, 130, 141, 248),
                    ),
                  ),
                  child: const Text('Sign Up'),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          const Center(
            child: Text(
              'Forgot Password?',
              style: TextStyle(
                decoration: TextDecoration.underline,
                color: Color.fromARGB(255, 130, 141, 248),
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    _height = MediaQuery.of(context).size.height;
    _width = MediaQuery.of(context).size.width;
    return Scaffold(
      body: Container(
        height: _height,
        width: _width,
        decoration: const BoxDecoration(
          color: Color.fromARGB(255, 23, 23, 23),
        ),
        child: Container(
          alignment: Alignment.center,
          margin:
              const EdgeInsets.only(left: 450, right: 450, top: 50, bottom: 50),
          padding: const EdgeInsets.all(15),
          decoration: const BoxDecoration(
            borderRadius: BorderRadius.all(Radius.circular(10)),
            color: Color.fromARGB(255, 31, 31, 31),
          ),
          child: buildCardContent(),
        ),
      ),
    );
  }
}
