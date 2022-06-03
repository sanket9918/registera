import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:registera/util/size_util.dart';
import 'package:registera/widgets/custom_app_bar.dart';

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

class ListOfEvents extends StatelessWidget {
  const ListOfEvents({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Query(
        options: QueryOptions(
            document: gql('''
query {
  findResponseByUser(input: { userId: "6280ec16363289a038e667b0" }) {
    _id
    userName
    userEmail
    user
    resId
    form
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

          List resultList = result.data!['findResponseByUser'];

          return SizedBox(
            height: SizeConfig.screenH,
            child: ListView.separated(
                scrollDirection: Axis.vertical,
                physics: ClampingScrollPhysics(),
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
