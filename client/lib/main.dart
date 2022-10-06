import 'package:flutter/material.dart';
import 'pages/login.dart';

void main() => runApp(const SelectApp());

class SelectApp extends StatelessWidget {
  const SelectApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        brightness: Brightness.dark,
      ),
      home: const Login(),
    );
  }
}
