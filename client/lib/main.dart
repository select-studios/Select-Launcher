import 'package:flutter/material.dart';
import 'package:select_launcher/src/util/colors.dart';
import 'package:select_launcher/src/util/route_generator.dart';

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
      initialRoute: '/',
      onGenerateRoute: RouteGenerator.generateRoute,
    );
  }
}
