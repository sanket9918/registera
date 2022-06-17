import { AuthHeader } from "../components/authHeader";
import { NewEventForm } from "../components/createForm";

export function CreateForm() {
  return (
    <>
      <div class="min-h-screen bg-slate-100">
        <AuthHeader />
        <NewEventForm />
      </div>
    </>
  );
}
