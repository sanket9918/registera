import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class UserWelcome extends StatelessWidget {
  const UserWelcome({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final storage = const FlutterSecureStorage();
    return FutureBuilder<String?>(
        future: storage.read(key: 'jwt'),
        builder: (context, snapshot) {
          Widget children = const Text("Hello Ghost");

          if (snapshot.hasError) {
            children = Text("${snapshot.error}");
          }
          return Query(
              options: QueryOptions(
                  document: gql('''
                   query{
          me{
            _id
            name
            email
          }
                    }
                    '''),
                  fetchPolicy: FetchPolicy.noCache,
                  cacheRereadPolicy: CacheRereadPolicy.ignoreAll),
              builder: (QueryResult result,
                  {Refetch? refetch, FetchMore? fetchMore}) {
                if (result.isLoading) {
                  return const SafeArea(
                      child: Scaffold(
                    body: Center(
                      child: CircularProgressIndicator(),
                    ),
                  ));
                }
                if (result.data == null && !result.hasException) {
                  return Scaffold(
                    body: Center(
                        child: Text(
                            "Loading complete, both data and errors are null")),
                  );
                }
                if (result.hasException) {
                  return const SafeArea(
                      child: Scaffold(
                    body: Center(
                        child: Text(
                            "Loading complete, both data and errors are null")),
                  ));
                }
                String? name = result.data?['me']?['name'];
                String? email = result.data?['me']?['email'];

                if (name != null && email != null) {
                  return SizedBox(
                    height: 70,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          "Hi,${name}",
                          style: Theme.of(context)
                              .textTheme
                              .headline1!
                              .copyWith(
                                  fontSize: 28, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                  );
                } else {
                  return const Text("No token found");
                }
              });
        });
  }
}
