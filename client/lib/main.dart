import 'package:flutter/material.dart';
import 'package:select_launcher/src/api/game_manager.dart';
import 'package:select_launcher/src/util/colors.dart';
import 'package:select_launcher/src/util/route_generator.dart';

void main() async {
  if (await checkIfTmpDirectoryExists().then((value) => value) == false) {
    createTmpDirectory();
    cloneGameInfo();
    return;
  } else {
    pullGameInfo();
  }
  runApp(const SelectApp());
}

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
        scaffoldBackgroundColor: primaryBg.withOpacity(0.9),
      ),
      initialRoute: '/',
      onGenerateRoute: RouteGenerator.generateRoute,
    );
  }
}
