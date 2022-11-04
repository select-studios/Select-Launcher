import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:select_launcher/src/util/colors.dart';
import 'package:bouncing_widget/bouncing_widget.dart';

class BounceButton extends StatelessWidget {
  final Color buttonColor;
  final String buttonContent;
  final void Function() buttonOnPress;
  const BounceButton(
      {Key? key,
      required this.buttonColor,
      required this.buttonContent,
      required this.buttonOnPress})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BouncingWidget(
      onPressed: buttonOnPress,
      duration: const Duration(milliseconds: 75),
      child: Container(
        height: 70,
        width: 200,
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
          child: Text(
            buttonContent,
            style: GoogleFonts.montserrat(
              textStyle: TextStyle(
                fontWeight: FontWeight.w600,
                fontSize: 16.0,
                color: white,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
