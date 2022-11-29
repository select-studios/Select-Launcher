import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:select_launcher/src/util/url_controller.dart';
import 'package:shared_preferences/shared_preferences.dart';

void login(String username, String password) async {
  final prefs = await SharedPreferences.getInstance();

  try {
    var response = await Dio().post(
      URLController.login,
      data: {'username': username, 'password': password},
    );

    if (response.statusCode == 201) {
      prefs.setString(
        'accessToken',
        response.data['user']['accessToken'].toString(),
      );
      prefs.setString(
        'refreshToken',
        response.data['user']['refreshToken'].toString(),
      );
      prefs.setString(
        'username',
        response.data['user']['username'].toString(),
      );

      if (kDebugMode) {
        print(
          <Object>[
            {
              prefs.getString('accessToken'),
              prefs.getString('refreshToken'),
              prefs.getString('username')
            }
          ],
        );
      }
    }
  } catch (error, stackTrace) {
    if (kDebugMode) {
      print('Exception occurred: $error  stackTrace: $stackTrace');
    }
  }
}
