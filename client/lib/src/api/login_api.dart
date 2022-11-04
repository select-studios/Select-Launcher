import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:select_launcher/src/util/url_controller.dart';
import 'package:select_launcher/src/util/settings_manager.dart';

void login(String username, String password) async {
  try {
    var response = await Dio().post(
      URLController.login,
      data: {'username': username, 'password': password},
    );

    if (response.statusCode == 201) {
      SettingsManager.setAccessToken(response.data['user']['accessToken']);
      SettingsManager.setRefreshToken(response.data['user']['refreshToken']);
      SettingsManager.setUsername(response.data['user']['username']);

      if (kDebugMode) {
        print(SettingsManager.settings['accessToken']);
        print(SettingsManager.settings['refreshToken']);
        print(SettingsManager.settings['username']);
      }
    }
  } catch (error, stackTrace) {
    if (kDebugMode) {
      print('Exception occurred: $error  stackTrace: $stackTrace');
    }
  }
}
