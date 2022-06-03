import 'package:flutter/material.dart';
import 'package:registera/config/util.dart';

class Splash extends StatelessWidget {
  const Splash({Key? key}) : super(key: key);

  initMethod(context) async {
    String? _token = await Config.showToken();

    if (_token == null || _token.isEmpty) {
      Navigator.of(context).pushReplacementNamed('/login');
    } else {
      Navigator.of(context).pushReplacementNamed('/dashboard');
    }
  }

  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance.addPostFrameCallback((_) => initMethod(context));

    return const Scaffold(
      body: Center(
        child: CircularProgressIndicator(),
      ),
    );
  }
}
