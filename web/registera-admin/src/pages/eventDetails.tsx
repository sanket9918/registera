import { useEffect, useState } from "preact/hooks";
import { AuthBody } from "../components/AuthBody";
import useFindResponseByForm from "../hooks/useFindResponseByForm";
import EventLogo from "./../assets/events.svg";
export function EventDetailPage(props: any) {
  const formId = props.matches.id;
  const [findresponses, refershQuery] = useFindResponseByForm();
  const [responses, setResponses] = useState([
    {
      _id: "",
      user: "",
      userName: "",
    },
  ]);
  useEffect(() => {
    findresponses({
      variables: {
        input: {
          formId: formId,
        },
      },
      onCompleted: (data) => {
        setResponses(data.findResponseByForm);
      },
    });
  }, []);
  return (
    <>
      <AuthBody>
        <div class="mt-5 md:mt-[3em] min-h-screen">
          <div class="lg:grid grid-cols-2">
            <div>
              <div class="flex justify-between items-center">
                <h2 class="font-semibold text-base md:text-2xl">
                  Registrations
                </h2>
                <button
                  onClick={() => refershQuery()}
                  className="h-12 rounded-3xl bg-green-700 px-6 text-center text-sm text-white hover:bg-black  disabled:bg-slate-300 disabled:text-slate-600"
                >
                  Refresh
                </button>
              </div>
              {responses.length > 0 ? (
                <div class="mt-5 space-y-6">
                  {responses.map((e) => (
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
              ) : (
                <div class="mt-4">
                  <p>No registrations yet.</p>
                </div>
              )}
            </div>
            <div class="mx-auto min-h-screen invisible lg:visible">
              <div class="flex flex-col justify-center items-center ">
                <img src={EventLogo} height="5em" alt="" class="h-[20em]" />
                <p class="mt-4 font-bold">Registration Viewer</p>
                <p class="mt-2 ">
                  You can explore the registerations done by the users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AuthBody>
    </>
  );
}
