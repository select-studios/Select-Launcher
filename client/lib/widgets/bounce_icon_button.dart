import 'package:flutter/material.dart';
import 'package:bouncing_widget/bouncing_widget.dart';

class BounceIconButton extends StatelessWidget {
  final Color buttonColor;
  final IconData icon;
  final double height, width;
  final String label;
  final Color iconColor;
  final void Function() buttonOnPress;
  const BounceIconButton(
      {Key? key,
      required this.buttonColor,
      required this.icon,
      required this.height,
      required this.width,
      required this.label,
      required this.iconColor,
      required this.buttonOnPress})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BouncingWidget(
      onPressed: buttonOnPress,
      duration: const Duration(milliseconds: 75),
      child: Container(
        height: height,
        width: width,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(9.0),
          boxShadow: const [
            BoxShadow(
              color: Color(0x80000000),
              blurRadius: 12.0,
              offset: Offset(0.0, 5.0),
            ),
          ],
          color: buttonColor,
        ),
        child: Center(
          child: Icon(
            icon,
            color: Colors.white,
            size: 30.0,
            semanticLabel: label,
          ),
        ),
      ),
    );
  }
}
