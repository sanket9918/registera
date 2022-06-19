import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "preact-router";
import { useEffect, useState } from "preact/hooks";
import { AuthBody } from "../components/AuthBody";
import useListEvents from "../hooks/useListEvents";
import EventLogo from "./../assets/events.svg";
export function Dashboard() {
  const [events, setEvents] = useState([
    {
      _id: "",
      name: "",
      description: "",
      formId: "",
    },
  ]);
  useEffect(() => {
    listEvents({
      onCompleted: (data) => {
        setEvents(data.forms);
      },
    });
  }, []);
  console.log(events);

  const [listEvents, refershQuery] = useListEvents();
  return (
    <>
      <AuthBody>
        <div class="mt-5 md:mt-[3em]">
          <div class="lg:grid grid-cols-2">
            <div>
              <div class="flex justify-between items-center">
                <h2 class="font-semibold text-base md:text-2xl">
                  Active forms
                </h2>
                <button
                  onClick={() => refershQuery()}
                  className="h-12 rounded-3xl bg-green-700 px-6 text-center text-sm text-white hover:bg-black  disabled:bg-slate-300 disabled:text-slate-600"
                >
                  <FontAwesomeIcon icon={faArrowRotateRight} /> Refresh
                </button>
              </div>

              {events.length > 0 ? (
                <div class="mt-5 space-y-6">
                  {events.map((e) => (
                    <div class="mt-4">
                      <Link href={`/eventDetail/${e._id}/${e.name} `}>
                        <div class="border-2 border-green-700 p-3 rounded-xl">
                          <div class="flex justify-between items-center">
                            <p class="font-bold">{e.name}</p>
                            <p>ID: {e.formId}</p>
                          </div>
                          Description: {e.description}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div class="mt-5 space-y-6">
                  <p>No events found.</p>
                </div>
              )}
            </div>

            <div class="mx-auto min-h-screen invisible lg:visible">
              <div class="flex flex-col justify-center items-center ">
                <img src={EventLogo} height="5em" alt="" class="h-[20em]" />
                <p class="mt-4 font-bold">Your details in your control</p>
                <p class="mt-2 ">
                  You can customise the way the info flows to the event manager.
                </p>
                <Link href="/createForm">
                  <button
                    type="button"
                    className="h-12 mt-6 rounded-3xl bg-green-700 px-6 text-center text-sm text-white hover:bg-black  disabled:bg-slate-300 disabled:text-slate-600"
                  >
                    Create your own form
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AuthBody>
    </>
  );
}
