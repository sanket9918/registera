import { AuthBody } from "../components/AuthBody";
import { AuthHeader } from "../components/authHeader";
import { NewEventForm } from "../components/createForm";

export function CreateForm() {
  return (
    <>
      <AuthBody>
        <NewEventForm />
      </AuthBody>
    </>
  );
}
