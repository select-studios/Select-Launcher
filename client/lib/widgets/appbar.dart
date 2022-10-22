// ignore_for_file: avoid_unnecessary_containers

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:select_launcher/util/colors.dart';

class SelectAppBar extends StatelessWidget with PreferredSizeWidget {
  @override
  final Size preferredSize;

  SelectAppBar({Key? key})
      : preferredSize = const Size.fromHeight(56.0),
        super(key: key);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: Container(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              'assets/launcherIcon.png',
              height: 100,
              width: 70,
            ),
            const SizedBox(width: 10),
            Text(
              'Select Studios',
              style: GoogleFonts.montserrat(
                textStyle: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 30.0,
                ),
              ),
            )
          ],
        ),
      ),
      centerTitle: true,
      elevation: 10,
      backgroundColor: secondaryBg,
      shadowColor: Colors.black,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.only(
          bottomLeft: Radius.circular(15),
          bottomRight: Radius.circular(15),
        ),
      ),
      automaticallyImplyLeading: true,
    );
  }
}
