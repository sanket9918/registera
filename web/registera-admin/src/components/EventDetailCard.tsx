import { useEffect, useState } from "preact/hooks";
import useFindResponseByForm from "../hooks/useFindResponseByForm";
import { AuthBody } from "./AuthBody";

export function EventDetailCard(props: any) {
  const formId = props.matches.id;
  const [findresponses, refershQuery] = useFindResponseByForm();
  const [reponses, setResponses] = useState([
    {
      _id: "",
      user: "",
      userName: "",
    },
  ]);
  useEffect(() => {
    findresponses({
      variables: {
        formId: formId,
      },
      onCompleted: (data) => {
        console.log(data);

        setResponses(data.findResponseByForm);
      },
    });
  }, []);
  return (
    <AuthBody>
      <div class="mt-5 md:mt-[3em]">
        <div class="lg:grid grid-cols-2">
          <div class="flex justify-between items-center">
            <h2 class="font-semibold text-base md:text-2xl">Registrations</h2>
            <button
              onClick={() => refershQuery()}
              className="h-12 rounded-3xl bg-green-700 px-6 text-center text-sm text-white hover:bg-black  disabled:bg-slate-300 disabled:text-slate-600"
            >
              Refresh
            </button>
          </div>
          <div class="mt-5 space-y-6">
            {reponses.map((e) => (
              <div class="mt-4">
                <div class="border-2 border-green-700 p-3 rounded-xl">
                  <div class="flex justify-between items-center">
                    <p class="font-bold">{e.userName}</p>
                    <p>ID: {e.user}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthBody>
  );
}
