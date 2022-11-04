import 'package:settings_yaml/settings_yaml.dart';

class SettingsManager {
  static final settings =
      SettingsYaml.load(pathToSettings: '.selectLauncherSettings.yaml');

  static void setAccessToken(String accessToken) {
    settings['accessToken'] = accessToken;
    settings.save();
  }

  static void setRefreshToken(String refreshToken) {
    settings['refreshToken'] = refreshToken;
    settings.save();
  }

  static void setUsername(String username) {
    settings['username'] = username;
    settings.save();
  }

  static void setEmail(String email) {
    settings['email'] = email;
    settings.save();
  }
}
