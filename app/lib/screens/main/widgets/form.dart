import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:registera/screens/main/widgets/form_item.dart';
import 'package:registera/screens/register_event/register_event.dart';
import 'package:registera/util/size_util.dart';

class Forms extends StatelessWidget {
  const Forms({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Query(
        options: QueryOptions(document: gql('''
    query {
    forms{
    _id
    name
    description
    formId
    }
    }
    '''),
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
          List resultList = result.data!['forms'];
          return SizedBox(
            height: SizeConfig.screenH,
            child: ListView.separated(
              scrollDirection: Axis.vertical,
              itemCount: resultList.length,
              separatorBuilder: (_, index) => const SizedBox(
                height: 10,
              ),
              itemBuilder: (context, index) {
                return GestureDetector(
                  onTap: (() {
                    Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => RegisterEventForm(
                            "${resultList[index]['formId']}")));
                  }),
                  // child: ListTile(
                  //   title: Text("${resultList[index]['name']}"),
                  //   subtitle: Text("${resultList[index]['description']}"),
                  //   tileColor: Colors.transparent,
                  // ),

                  child: FormItem(resultList[index]['name'],
                      resultList[index]['description']),
                );
              },
            ),
          );
        });
  }
}
