import 'package:flutter/material.dart';
import 'package:registera/screens/main/dashboard.dart';
import 'package:registera/widgets/custom_app_bar.dart';

class SuccessfulRegister extends StatelessWidget {
  const SuccessfulRegister({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const PreferredSize(
          preferredSize: Size.fromHeight(50), child: CustomAppBar()),
      body: Container(
        padding: EdgeInsets.symmetric(horizontal: 40, vertical: 20),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.check_circle,
                color: Colors.green[900],
                size: 150,
              ),
              const SizedBox(
                height: 10,
              ),
              Text(
                "Congratulations ",
                style: Theme.of(context)
                    .textTheme
                    .headline1!
                    .copyWith(fontSize: 28, fontWeight: FontWeight.bold),
              ),
              const SizedBox(
                height: 10,
              ),
              Text(
                "You have successfully registered for the event ",
                style: Theme.of(context)
                    .textTheme
                    .bodyText1!
                    .copyWith(fontSize: 18, fontWeight: FontWeight.normal),
                textAlign: TextAlign.center,
              ),
              const SizedBox(
                height: 15,
              ),
              ElevatedButton(
                  onPressed: () {
                    Navigator.of(context).pushReplacement(
                        MaterialPageRoute(builder: (_) => const Dashboard()));
                  },
                  child: const Text("Go back to main page"))
            ],
          ),
        ),
      ),
    );
  }
}
