import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:registera/screens/register_event/successful_register.dart';
import 'package:registera/util/size_util.dart';
import 'package:registera/widgets/custom_app_bar.dart';
import 'package:registera/widgets/custom_button.dart';
import 'package:registera/widgets/toast_util.dart';

class RegisterEventForm extends StatelessWidget {
  final String formId;
  const RegisterEventForm(this.formId);
  @override
  Widget build(BuildContext context) {
    return Query(
        options: QueryOptions(document: gql('''
    query Form(\$formId:String!){
  form(input:{formId:\$formId}){
    _id
    name
    description
    formId
    user
    questions {
      quesId
      question
    }
  }
}

'''), variables: {"formId": formId}),
        builder: (QueryResult resultQuery,
            {Refetch? refetch, FetchMore? fetchMore}) {
          if (resultQuery.isLoading) {
            return const Text("Loading....");
          }
          if (resultQuery.data == null && !resultQuery.hasException) {
            return const Text(
                "Loading complete, both data and errors are null");
          }
          if (resultQuery.hasException) {
            return const Text(
                "Loading complete, both data and errors are null");
          }
          List questionList = resultQuery.data!['form']['questions'];

          return Scaffold(
            appBar: const PreferredSize(
                preferredSize: Size.fromHeight(50), child: CustomAppBar()),
            body: SizedBox(
              height: SizeConfig.screenH,
              child: SingleChildScrollView(
                child: Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 25, vertical: 20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Event Details",
                        style: Theme.of(context).textTheme.headline1!.copyWith(
                            fontSize: 20, fontWeight: FontWeight.bold),
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 25, vertical: 20),
                        decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(
                                color: Theme.of(context).colorScheme.primary)),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "Form ID: ",
                              style: Theme.of(context)
                                  .textTheme
                                  .headline1!
                                  .copyWith(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold),
                            ),
                            const SizedBox(
                              height: 10,
                            ),
                            Text(
                              "${resultQuery.data!['form']['formId']}",
                              style: Theme.of(context)
                                  .textTheme
                                  .headline1!
                                  .copyWith(
                                      fontSize: 16,
                                      fontWeight: FontWeight.normal),
                            ),
                            const SizedBox(
                              height: 10,
                            ),
                            Text(
                              "Form name: ",
                              style: Theme.of(context)
                                  .textTheme
                                  .headline1!
                                  .copyWith(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold),
                            ),
                            const SizedBox(
                              height: 10,
                            ),
                            Text(
                              "${resultQuery.data!['form']['name']}",
                              style: Theme.of(context)
                                  .textTheme
                                  .headline1!
                                  .copyWith(
                                      fontSize: 16,
                                      fontWeight: FontWeight.normal),
                            ),
                            const SizedBox(
                              height: 10,
                            ),
                            Text(
                              "Form description: ",
                              style: Theme.of(context)
                                  .textTheme
                                  .headline1!
                                  .copyWith(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold),
                            ),
                            const SizedBox(
                              height: 10,
                            ),
                            Text(
                              "${resultQuery.data!['form']['description']}",
                              style: Theme.of(context)
                                  .textTheme
                                  .headline1!
                                  .copyWith(
                                      fontSize: 16,
                                      fontWeight: FontWeight.normal),
                            ),
                            const SizedBox(
                              height: 20,
                            ),
                            // Text(
                            //   "Additional questions",
                            //   style: Theme.of(context).textTheme.headline1!.copyWith(
                            //       fontSize: 18, fontWeight: FontWeight.bold),
                            // ),
                            // ...questionList.map((e) {
                            //   return Container(
                            //     padding: EdgeInsets.symmetric(vertical: 20),
                            //     height: 80,
                            //     child: Column(
                            //       children: [
                            //         Text(
                            //           "${e['question']}",
                            //           style: Theme.of(context)
                            //               .textTheme
                            //               .headline1!
                            //               .copyWith(
                            //                   fontSize: 16,
                            //                   fontWeight: FontWeight.bold),
                            //         )
                            //       ],
                            //     ),
                            //   );
                            // }).toList(),
                            Center(
                              child: Mutation(
                                options: MutationOptions(
                                  document: gql('''
mutation CreateResponse(\$input:CreateResponseInput!) {
  createResponse(
    input: \$input
  ) {
    _id
    user
    form
  }
}

'''),
                                  update:
                                      // ignore: void_checks
                                      (GraphQLDataProxy cache,
                                          QueryResult? result) {
                                    return cache;
                                  },
                                  onError: (OperationException? e) {
                                    debugPrint("$e");
                                    ToastUtil.showToast(
                                        "Already registered", context);
                                  },
                                  onCompleted: (dynamic resultData) {
                                    Navigator.of(context).pushReplacement(
                                        MaterialPageRoute(
                                            builder: (_) =>
                                                const SuccessfulRegister()));
                                  },
                                ),
                                builder: (
                                  RunMutation? runMutation,
                                  QueryResult? result,
                                ) {
                                  String? formInput =
                                      resultQuery.data?['form']['_id'];
                                  debugPrint(formInput);
                                  return CustomButton(
                                      onTap: () async {
                                        runMutation!({
                                          "input": {
                                            "form": formInput,
                                            "questions": []
                                          }
                                        });
                                      },
                                      text: "Register",
                                      height: 50,
                                      width: 180);
                                },
                              ),
                            )
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          );
        });
  }
}
