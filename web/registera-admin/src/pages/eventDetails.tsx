import { EventDetailCard } from "../components/EventDetailCard";
export function EventDetailPage(props: any) {
  const formId = props.matches.id;
  const name = props.matches.name;
  return (
    <>
      <EventDetailCard formId={formId} name={name} />
    </>
  );
}
