import { gql, useLazyQuery } from "@apollo/client";

const FIND_RESPONSE = gql`
    query ($input: GetResponseByForm!) {
        findResponseByForm(input: $input) {
            ... on Response {
                _id
                user
                userName
            }
        }
    }
`;

function useFindResponseByForm() {
    const [findresponses, { refetch: refreshQuery }] =
        useLazyQuery(FIND_RESPONSE);
    return [findresponses, refreshQuery];
}

export default useFindResponseByForm;
