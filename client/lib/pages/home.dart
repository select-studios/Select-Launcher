import 'package:flutter/material.dart';
import 'package:select_launcher/src/util/colors.dart';
import 'package:select_launcher/widgets/appbar.dart';
import 'package:select_launcher/widgets/bounce_button.dart';

class Home extends StatelessWidget {
  final String username;
  const Home({Key? key, required this.username}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: SelectAppBar(
        username: username,
      ),
      body: Center(
        child: Column(
          children: [
            Text('hi $username'),
            SizedBox(
              height: 50,
              width: 140,
              child: BounceButton(
                buttonColor: primary,
                buttonContent: 'Go Back',
                height: 70,
                width: 200,
                buttonOnPress: () {
                  Navigator.of(context).pushNamed('/');
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
