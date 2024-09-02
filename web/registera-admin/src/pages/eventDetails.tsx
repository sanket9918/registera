import { EventDetailCard } from "../components/EventDetailCard";

export function EventDetailPage(props: any) {
    const formId = props.matches.id;
    const name = props.matches.name;
    const ownerUserId = props.matches.userId;

    return (
        <>
            <EventDetailCard
                formId={formId}
                name={name}
                ownerUserId={ownerUserId}
            />
        </>
    );
}
