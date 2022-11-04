import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';
import 'package:select_launcher/src/util/colors.dart';
import 'package:select_launcher/widgets/bounce_button.dart';

void main() {
  testWidgets(
    'Check if button has text and click event fires',
    (tester) async {
      bool buttonChangeTester = false;
      await tester.pumpWidget(
        MaterialApp(
          home: BounceButton(
            buttonColor: primary,
            buttonContent: 'Username',
            buttonOnPress: () {
              buttonChangeTester = true;
            },
            key: const Key('Test Button'),
          ),
        ),
      );
      final button = find.byKey(const Key('Test Button'));

      expect(button, findsOneWidget);
      expect(find.text('Username'), findsOneWidget);

      await tester.tap(button);
      await tester.pumpAndSettle();
      expect(buttonChangeTester, true);
    },
  );
}
