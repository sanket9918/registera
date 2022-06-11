import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:registera/config/util.dart';
import 'package:registera/screens/onboarding.dart';
import 'package:registera/screens/splash.dart';

class CustomAppBar extends StatelessWidget {
  const CustomAppBar({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final storage = new FlutterSecureStorage();
    return SafeArea(
        child: Container(
      padding: EdgeInsets.symmetric(horizontal: 15),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            "Registera",
            style: Theme.of(context)
                .textTheme
                .headline1!
                .copyWith(fontSize: 20, fontWeight: FontWeight.normal),
          ),
          IconButton(
            icon: Icon(Icons.exit_to_app),
            onPressed: () async {
              await storage.delete(key: 'jwt');

              await Config.clearToken();
              await Config.logoutPref();

              Navigator.of(context).pushReplacement(
                  MaterialPageRoute(builder: (context) => OnboardingScreen()));
            },
          ),
        ],
      ),
    ));
  }
}
