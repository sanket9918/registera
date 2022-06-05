import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:provider/provider.dart';
import 'package:registera/config/util.dart';
import 'package:registera/main.dart';
import 'package:registera/util/size_util.dart';
import 'package:registera/widgets/custom_app_bar.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AlreadyRegistered extends StatelessWidget {
  const AlreadyRegistered({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const PreferredSize(
          preferredSize: Size.fromHeight(50), child: CustomAppBar()),
      body: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 25, vertical: 20),
              child: Column(
                children: const [
                  SizedBox(
                    height: 5,
                  ),
                  ListOfEvents()
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}

Future<String?> getId() async {
  late SharedPreferences prefs;

  prefs = await SharedPreferences.getInstance();
  String? token = prefs.getString('userId');

  ListOfEvents.userId = token;
  return token;
}

class ListOfEvents extends StatefulWidget {
  static String? userId;

  const ListOfEvents({Key? key}) : super(key: key);

  @override
  State<ListOfEvents> createState() => _ListOfEventsState();
}

class _ListOfEventsState extends State<ListOfEvents> {
  String? userId;
  @override
  void initState() {
    super.initState();
    getId();
  }

  @override
  Widget build(BuildContext context) {
    return Query(
        options: QueryOptions(
            document: gql('''
query FindResponseByUser(\$input:GetResponseByUser!) {
  findResponseByUser(input: \$input) {
    _id
    userName
    userEmail
    user
    resId
    form
  }
}

'''),
            variables: {
              "input": {
                "userId": Provider.of<User>(context).data["_id"].toString()
              }
            },
            fetchPolicy: FetchPolicy.noCache,
            cacheRereadPolicy: CacheRereadPolicy.ignoreAll),
        builder: (QueryResult result,
            {Refetch? refetch, FetchMore? fetchMore}) {
          if (result.isLoading) {
            return const Text("Loading....");
          }
          if (result.data == null && !result.hasException) {
            return const Text(
                "Loading complete, both data and errors are null");
          }
          if (result.hasException) {
            return const Text(
                "Loading complete, both data and errors are null");
          }

          List resultList = result.data!['findResponseByUser'];

          return SizedBox(
            height: SizeConfig.screenH,
            child: ListView.separated(
                scrollDirection: Axis.vertical,
                itemBuilder: (context, index) {
                  return Container(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 15, vertical: 10),
                    decoration: BoxDecoration(
                        border: Border.all(
                            color: Theme.of(context).colorScheme.primary),
                        borderRadius: BorderRadius.circular(10)),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Response ID: ",
                          style: Theme.of(context)
                              .textTheme
                              .headline1!
                              .copyWith(
                                  fontSize: 18, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        Text(resultList[index]['resId'],
                            style: Theme.of(context)
                                .textTheme
                                .headline1!
                                .copyWith(
                                    fontSize: 16,
                                    fontWeight: FontWeight.normal)),
                        const SizedBox(
                          height: 10,
                        ),
                        Text(
                          "Form ID: ",
                          style: Theme.of(context)
                              .textTheme
                              .headline1!
                              .copyWith(
                                  fontSize: 18, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        Text(resultList[index]['form'],
                            style: Theme.of(context)
                                .textTheme
                                .headline1!
                                .copyWith(
                                    fontSize: 16,
                                    fontWeight: FontWeight.normal))
                      ],
                    ),
                  );
                },
                separatorBuilder: (_, index) => const SizedBox(
                      height: 10,
                    ),
                itemCount: resultList.length),
          );
        });
  }
}
