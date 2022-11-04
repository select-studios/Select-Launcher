import 'package:flutter/foundation.dart';

class URLController {
  static const String _debugEndpoint = 'http://localhost:4757/api';
  static const String _productionEndpoint =
      'https://web-production-7960.up.railway.app/api';

  static const String _endpoint =
      kReleaseMode ? _productionEndpoint : _debugEndpoint;

  static const register = '$_endpoint/accounts/register';
  static const login = '$_endpoint/accounts/login';
  static const refresh = '$_endpoint/accounts/refresh';
  static const logout = '$_endpoint/accounts/logout';
}
