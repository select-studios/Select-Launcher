import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:select_launcher/widgets/select_input.dart';

void main() {
  testWidgets(
    'check input placeholder and onChanged event firing',
    (tester) async {
      String inputValue = '';
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: SelectInput(
              placeholder: 'Test Input',
              obscureText: false,
              onChanged: (value) {
                inputValue = value;
              },
              key: const Key('Test Input'),
            ),
          ),
        ),
      );

      final input = find.byKey(const Key('Test Input'));

      expect(input, findsOneWidget);
      await tester.enterText(input, 'Test Input');
      await tester.pumpAndSettle();
      expect(inputValue, 'Test Input');
    },
  );
}
