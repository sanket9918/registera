import { gql, useMutation } from "@apollo/client";

const CREATE_RESPONSE = gql`
  mutation CreateResponse($form: String!) {
    createResponse(input: { form: $form, questions: [] }) {
      _id
      user
      form
    }
  }
`;

function useCreateResponse() {
  const [createResponse] = useMutation(CREATE_RESPONSE);
  return [createResponse];
}

export default useCreateResponse;
