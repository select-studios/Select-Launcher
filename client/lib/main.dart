import 'package:flutter/material.dart';
import 'package:select_launcher/src/util/colors.dart';
import 'pages/login.dart';

void main() => runApp(const SelectApp());

class SelectApp extends StatelessWidget {
  const SelectApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        primaryColorDark: primary,
        platform: TargetPlatform.windows,
        scaffoldBackgroundColor: primaryBg,
      ),
      home: const Login(),
    );
  }
}
