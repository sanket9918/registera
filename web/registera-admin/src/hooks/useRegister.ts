import { gql, useMutation } from "@apollo/client";

const REGISTER = gql`
  mutation (
    $name: String!
    $email: String!
    $password: String!
    $roles: [String!]!
  ) {
    createUser(
      input: { name: $name, email: $email, password: $password, roles: $roles }
    ) {
      _id
      name
      email
      roles
    }
  }
`;

function useRegister() {
  const [register] = useMutation(REGISTER, {
    fetchPolicy: "no-cache",
  });
  return [register];
}
export default useRegister;
