// ignore_for_file: avoid_unnecessary_containers

import 'package:feather_icons/feather_icons.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:select_launcher/src/util/colors.dart';
import 'package:select_launcher/widgets/bounce_button.dart';
import 'package:select_launcher/widgets/bounce_icon_button.dart';

class SelectAppBar extends StatelessWidget with PreferredSizeWidget {
  @override
  final Size preferredSize;
  String? username;

  SelectAppBar({Key? key, this.username})
      : preferredSize = const Size.fromHeight(56.0),
        super(key: key);

  @override
  Widget build(BuildContext context) {
    if (username == null) {
      return Container(
        decoration: BoxDecoration(
          color: secondaryBg,
          borderRadius: const BorderRadius.only(
            bottomLeft: Radius.circular(15),
            bottomRight: Radius.circular(15),
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.5),
              spreadRadius: 0,
              blurRadius: 21,
              offset: const Offset(0, 11), // changes position of shadow
            ),
          ],
        ),
        child: SizedBox(
          width: preferredSize.width,
          height: preferredSize.height,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Image.asset(
                'assets/launcherIcon.png',
                height: 100,
                width: 70,
                key: const Key('Select Logo'),
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
                key: const Key('Title'),
              ),
            ],
          ),
        ),
      );
    } else {
      return Container(
        decoration: BoxDecoration(
          color: secondaryBg,
          borderRadius: const BorderRadius.only(
            bottomLeft: Radius.circular(15),
            bottomRight: Radius.circular(15),
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.5),
              spreadRadius: 0,
              blurRadius: 21,
              offset: const Offset(0, 11), // changes position of shadow
            ),
          ],
        ),
        child: SizedBox(
          width: preferredSize.width,
          height: preferredSize.height,
          child: IntrinsicHeight(
            child: Stack(
              children: [
                Align(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Image.asset(
                        'assets/launcherIcon.png',
                        height: 100,
                        width: 70,
                        key: const Key('Select Logo'),
                      ),
                      Text(
                        'Select Studios',
                        style: GoogleFonts.montserrat(
                          textStyle: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 30.0,
                          ),
                        ),
                        key: const Key('Title'),
                      ),
                    ],
                  ),
                ),
                Positioned(
                  right: 0,
                  child: Container(
                    margin: const EdgeInsets.only(right: 10, top: 3),
                    child: BounceIconButton(
                      buttonColor: tertiaryBg,
                      icon: FeatherIconsSnakeCase.user,
                      height: 48,
                      width: 48,
                      label: 'account',
                      iconColor: Colors.white,
                      buttonOnPress: () {},
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      );
    }
  }
}
