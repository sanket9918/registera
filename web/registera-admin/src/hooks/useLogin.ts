import { gql, useLazyQuery, useMutation } from "@apollo/client";

const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      __typename
    }
  }
`;

const QUERY_USER = gql`
  query {
    me {
      _id
      name
      email
    }
  }
`;

function useLogin() {
  const [loginIniator] = useMutation(LOGIN, {
    fetchPolicy: "no-cache",
  });

  const [queryUser] = useLazyQuery(QUERY_USER);
  return [loginIniator, queryUser];
}
export default useLogin;
