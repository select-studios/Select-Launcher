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
  bool rememberMe = true;

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
          Center(
            child: Row(
              children: <Widget>[
                SizedBox(
                  width: 207,
                  child: TextButton(
                    onPressed: () {},
                    style: TextButton.styleFrom(
                      foregroundColor: const Color.fromARGB(255, 130, 141, 248),
                    ),
                    child: const Text('Forgot Password'),
                  ),
                ),
                const Text(' or '),
                SizedBox(
                  width: 207,
                  child: TextButton(
                    onPressed: () {},
                    style: TextButton.styleFrom(
                      foregroundColor: const Color.fromARGB(255, 130, 141, 248),
                    ),
                    child: const Text('Sign in later'),
                  ),
                ),
              ],
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
          image: DecorationImage(
              image: AssetImage('assets/storeBg.png'), fit: BoxFit.cover),
        ),
        child: GlassmorphicContainer(
          width: _width,
          height: _height,
          alignment: Alignment.center,
          margin:
              const EdgeInsets.only(left: 450, right: 450, top: 50, bottom: 50),
          border: 0,
          blur: 3,
          linearGradient: LinearGradient(
            colors: [
              const Color.fromARGB(255, 15, 23, 41).withOpacity(0.5),
              const Color.fromARGB(255, 15, 23, 41).withOpacity(0.5),
            ],
            begin: Alignment.bottomCenter,
            end: Alignment.topCenter,
          ),
          borderGradient: LinearGradient(
            colors: [
              const Color.fromARGB(255, 15, 23, 41).withOpacity(0.5),
              const Color.fromARGB(255, 15, 23, 41).withOpacity(0.5),
            ],
            begin: Alignment.bottomCenter,
            end: Alignment.topCenter,
          ),
          borderRadius: 10,
          child: Container(
            padding: const EdgeInsets.all(15),
            child: buildCardContent(),
          ),
        ),
      ),
    );
  }
}
