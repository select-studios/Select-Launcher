import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:select_launcher/widgets/appbar.dart';
import 'package:google_fonts/google_fonts.dart';

void main() {
  testWidgets('Appbar has a title and logo', (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          appBar: SelectAppBar(),
        ),
      ),
    );

    final selectLogo = find.byKey(const Key('Select Logo'));
    final title = find.byKey(const Key('Title'));
    Text titleText = tester.firstWidget(title);

    expect(selectLogo, findsOneWidget);
    expect(title, findsOneWidget);

    expect(titleText.data, 'Select Studios');
    expect(
      titleText.style,
      GoogleFonts.montserrat(
        textStyle: const TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 30.0,
        ),
      ),
    );
  });
}
