import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:select_launcher/src/util/colors.dart';

class SelectInput extends StatelessWidget {
  final String placeholder;
  final bool obscureText;
  final void Function(String) onChanged;
  const SelectInput(
      {Key? key,
      required this.placeholder,
      required this.obscureText,
      required this.onChanged})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextField(
      obscureText: obscureText,
      decoration: InputDecoration(
        hintText: placeholder,
        hintStyle: GoogleFonts.montserrat(
          textStyle: const TextStyle(
            fontWeight: FontWeight.w400,
            fontSize: 16.0,
            color: Colors.white,
          ),
        ),
        fillColor: tertiaryBg,
        focusColor: primary,
        enabledBorder: OutlineInputBorder(
          borderSide: BorderSide(
            color: tertiaryBg,
            width: 0.0,
          ),
          borderRadius: BorderRadius.circular(10.0),
        ),
        focusedBorder: OutlineInputBorder(
          borderSide: BorderSide(color: primary, width: 2.0),
          borderRadius: BorderRadius.circular(10.0),
        ),
        filled: true,
      ),
      onChanged: onChanged,
    );
  }
}
