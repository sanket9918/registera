import 'package:shared_preferences/shared_preferences.dart';

class Config {
  static savePref(String key, value) async {
    late SharedPreferences prefs;
    prefs = await SharedPreferences.getInstance();
    prefs.setBool(key, value);
  }

  static loginPref(String jwt) async {
    late SharedPreferences prefs;
    prefs = await SharedPreferences.getInstance();
    prefs.setBool('auth', true);
    prefs.setString('token', jwt);
  }

  static Future<String?> showToken() async {
    late SharedPreferences prefs;
    prefs = await SharedPreferences.getInstance();
    return prefs.getString('token');
  }

  static clearToken() async {
    late SharedPreferences prefs;
    prefs = await SharedPreferences.getInstance();
    prefs.clear();
  }

  static logoutPref() async {
    late SharedPreferences prefs;
    prefs = await SharedPreferences.getInstance();
    prefs.setBool('auth', false);
  }

  static Future<bool?> retrieveAuthPref() async {
    late SharedPreferences prefs;
    prefs = await SharedPreferences.getInstance();
    return prefs.getBool('auth');
  }

  static deletePref(String key) async {
    late SharedPreferences prefs;
    prefs = await SharedPreferences.getInstance();
    prefs.remove(key);
  }

  static retrievePref(String key) async {
    late SharedPreferences prefs;
    prefs = await SharedPreferences.getInstance();
    prefs.remove(key);
  }

  static updateUserToken(String token) async {
    late SharedPreferences prefs;
    prefs = await SharedPreferences.getInstance();
    prefs.setString('token', token);
  }
}
