import 'package:flutter/foundation.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

Future<String?> getToken() async {
  late SharedPreferences prefs;

  prefs = await SharedPreferences.getInstance();
  String? token = prefs.getString('token');
  return token;
}

class CustomAuthLink extends Link {
  CustomAuthLink();

  @override
  Stream<Response> request(Request request, [NextLink? forward]) async* {
    // Some logic here
    final token = await getToken();
    // final String? token = await sharedPreferenceService.token;
    debugPrint("$token");

    // TIP: do not forget getting new Request instance!
    final Request req = request.updateContextEntry<HttpLinkHeaders>(
      (HttpLinkHeaders? headers) => HttpLinkHeaders(
        headers: <String, String>{
          // put oldest headers
          ...headers?.headers ?? <String, String>{},
          // and add a new headers
          'Authorization': token!
          // "Authorization":
          //     "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjgwZWMxNjM2MzI4OWEwMzhlNjY3YjAiLCJuYW1lIjoic2Fua2V0IiwiZW1haWwiOiJzYW5rZXRAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkNjEvTFZaaGdWR0xzZTVpQkFRVmg3dVZoQS5NdVNTS2NuVGZQUllZR2U5eHU0UXlhLnJvWm0iLCJyb2xlcyI6WyJVU0VSIl0sImNyZWF0ZWRBdCI6IjIwMjItMDUtMTVUMTI6MDM6MzQuNDU3WiIsInVwZGF0ZWRBdCI6IjIwMjItMDUtMTVUMTI6MDM6MzQuNDU3WiIsIl9fdiI6MCwiaWF0IjoxNjUyOTMxNDg2fQ.cs1ODOWoaC99xfqf8dEzRCf6qf99YkRbiiwVC5Z2yioRBJR8RyQtenqcl6jkn0NRzWZpLMTxP9d47wpaxvETdhg36yYRmGhmFjTSd2Voy_DRUtFogPA316sWKGApczaN51LrXjDZ7vBPBWA5oKuYl-tPHrCC694HU1D6nCVknos"
        },
      ),
    );

    // and "return" new Request with updated headers
    yield* forward!(req);
  }
}

class GraphqlConfig {
  // static String? _token = "";

  static final HttpLink httpLink = HttpLink(
    "http://10.0.2.2:5000/graphql",
  );

  static ValueNotifier<GraphQLClient> initialiseClient() {
    final CustomAuthLink customAuthLink = CustomAuthLink();
    final Link link = customAuthLink.concat(httpLink);

    ValueNotifier<GraphQLClient> client = ValueNotifier(
        GraphQLClient(cache: GraphQLCache(store: HiveStore()), link: link));

    return client;
  }

  GraphQLClient clientToQuery() {
    CustomAuthLink customAuthLink = CustomAuthLink();

    final Link link = customAuthLink.concat(httpLink);
    return GraphQLClient(
      cache: GraphQLCache(
        store: HiveStore(),
      ),
      link: link,
    );
  }
}
