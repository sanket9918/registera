import 'package:flutter/material.dart';
import 'package:toast/toast.dart';

class ToastUtil {
  static showToast(String message, BuildContext context) {
    Toast.show(message, duration: Toast.lengthLong, gravity: Toast.bottom);
  }
}
