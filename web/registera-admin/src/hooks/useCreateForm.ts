import { gql, useMutation } from "@apollo/client";

const CREATE_FORM = gql`
  mutation (
    $name: String!
    $description: String!
    $questions: [CreateFormQuestionInput!]!
  ) {
    createForm(
      input: { name: $name, description: $description, questions: $questions }
    ) {
      __typename
    }
  }
`;

function useCreateForm() {
  const [createform] = useMutation(CREATE_FORM, {
    fetchPolicy: "no-cache",
  });
  return [createform];
}

export default useCreateForm;
