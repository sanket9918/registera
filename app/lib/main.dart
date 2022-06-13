import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:provider/provider.dart';
import 'package:registera/client/client.dart';
import 'package:registera/config/util.dart';
import 'package:registera/screens/auth/login.dart';
import 'package:registera/screens/intro_splash.dart';
import 'package:registera/screens/main/dashboard.dart';
import 'package:toast/toast.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initHiveForFlutter();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    SystemChrome.setSystemUIOverlayStyle(
      SystemUiOverlayStyle.dark.copyWith(statusBarColor: Colors.transparent),
    );

    ValueNotifier<GraphQLClient> client = GraphqlConfig.initialiseClient();
    return GraphQLProvider(
        client: client,
        child: const MaterialApp(
            debugShowCheckedModeBanner: false, home: HomePage()));
  }
}

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    final ThemeData theme = ThemeData();
    String? token = "";

    initMethod(context) async {
      token = await Config.showToken();
    }

    @override
    void initState() {
      super.initState();
      initMethod(context);
    }

    final routes = <String, WidgetBuilder>{
      "/login": (BuildContext context) => const LoginPage(),
      "/dashboard": (BuildContext context) => const Dashboard()
    };

    ToastContext().init(context);

    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (context) => User(),
        ),
        ChangeNotifierProvider(create: (context) => OnboardingPref())
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        routes: routes,
        theme: theme.copyWith(
          colorScheme: theme.colorScheme.copyWith(
              background: const Color(0xFFFAFAFA),
              primary: const Color(0xFF008278),
              secondary: const Color(0xFFFFBD00)),
          textTheme: theme.textTheme.copyWith(
              headline1: const TextStyle(color: Color(0xFF100E34)),
              bodyText1:
                  TextStyle(color: const Color(0xFF100E34).withOpacity(0.5))),
        ),
        home: const IntroSplash(),
      ),
    );
  }
}

class User extends ChangeNotifier {
  Map<String, dynamic> data = {"_id": ""};

  void updateId(String input) {
    data['_id'] = input;
  }

  @override
  notifyListeners();
}

class OnboardingPref extends ChangeNotifier {
  bool isOnboarded = false;

  void updateOnBoardStatus() {
    isOnboarded = true;
  }

  @override
  notifyListeners();
}
