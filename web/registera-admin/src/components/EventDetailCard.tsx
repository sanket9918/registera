import { useEffect, useState } from "preact/hooks";
import useFindResponseByForm from "../hooks/useFindResponseByForm";
import { AuthBody } from "./AuthBody";
import EventLogo from "./../assets/events.svg";
import {
  faArrowLeft,
  faArrowRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { route } from "preact-router";
import { useInfo } from "../GlobalContext/UserInfo";
import useCreateResponse from "../hooks/useCreateResponse";

export function EventDetailCard(props: any) {
  const [owner, setOwner] = useState("");
  const { userInfo } = useInfo();

  const [findresponses, refershQuery] = useFindResponseByForm();
  const [createResponse] = useCreateResponse();
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
          formId: props.formId,
        },
      },
      onCompleted: (data) => {
        setResponses(data.findResponseByForm);
        setOwner(props.ownerUserId);
      },
    });
  });

  return (
    <>
      <AuthBody>
        <div class="mt-5 md:mt-[3em] min-h-screen">
          <div class="lg:grid grid-cols-2">
            <div>
              <div class="flex justify-between items-center">
                <h2 class="font-semibold text-base md:text-2xl">
                  <button
                    onClick={() => {
                      route("/dashboard", true);
                    }}
                    class="mr-4"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                  Registrations
                </h2>
                <button
                  onClick={() => refershQuery()}
                  className="h-12 rounded-3xl bg-green-700 px-6 text-center text-sm text-white hover:bg-black  disabled:bg-slate-300 disabled:text-slate-600"
                >
                  <FontAwesomeIcon icon={faArrowRotateRight} /> Refresh
                </button>
              </div>

              <div class="mt-4 mb-4">
                <p>
                  Form name: <span class="font-bold">{props.name}</span>
                </p>
                {(owner as string).match(userInfo.id) ? (
                  <p></p>
                ) : (
                  <div class="mt-4 mx-auto text-center p-2 border border-green-700 rounded-lg">
                    <p>Would you like to register for the event? </p>
                    <button
                      onClick={() => {
                        createResponse({
                          variables: {
                            form: props.formId,
                          },
                          onCompleted: (data) => {
                            alert("Response is successfully captured.");
                            refershQuery();
                          },
                          onError: (data) => {
                            alert("Already registered for the event.");
                          },
                        });
                      }}
                      className="h-12  mt-4 rounded-3xl bg-green-700 px-6 text-center text-sm text-white hover:bg-black  disabled:bg-slate-300 disabled:text-slate-600"
                    >
                      Register
                    </button>
                  </div>
                )}
              </div>
              {responses.length > 0 ? (
                <div class="mt-5 space-y-6">
                  {responses.map((e) => (
                    <div class="mt-4">
                      <div class="border-2 border-green-700 p-3 rounded-xl">
                        <div class="flex justify-between items-center">
                          <p class="font-bold">
                            {e.userName}
                            {e.user === userInfo.id ? (
                              <span> - You</span>
                            ) : null}
                          </p>
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
