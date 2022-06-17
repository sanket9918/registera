import { gql, useLazyQuery, useQuery } from "@apollo/client";

const LIST_EVENTS = gql`
  query {
    forms {
      _id
      name
      description
      formId
    }
  }
`;

function useListEvents() {
  const [listEvents, { refetch: refershQuery }] = useLazyQuery(LIST_EVENTS);

  return [listEvents, refershQuery];
}
export default useListEvents;
