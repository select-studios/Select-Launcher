// ignore_for_file: no_leading_underscores_for_local_identifiers

import 'package:flutter_color_models/flutter_color_models.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:select_launcher/util/colors.dart';

void main() {
  test(
    'Check if colors match palette',
    () async {
      const _primaryBg = HslColor(216, 2, 10);
      const _secondaryBg = HslColor(216, 6, 15);
      const _tertiaryBg = HslColor(213, 5, 35);
      const _primary = HslColor(252, 92, 70);

      expect(primary, _primary);
      expect(secondaryBg, _secondaryBg);
      expect(tertiaryBg, _tertiaryBg);
      expect(primaryBg, _primaryBg);
    },
  );
}
