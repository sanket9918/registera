import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header } from "./../components/header";
import {
  faCircleExclamation,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import { route } from "preact-router";
export function ErrorPage({}) {
  return (
    <>
      <div class="bg-slate-100 min-h-screen">
        <Header />
        <div class="min-h-screen mt-4 md:mt-[7em] mx-auto justify-center items-center">
          <div class="text-center">
            <h1 class="text-3xl text-green-700 font-bold">
              <h1 class="text-[10rem]">
                <FontAwesomeIcon icon={faCircleExclamation} />
              </h1>
              <h1 class="mt-6"> Looks like you are lost!</h1>
              <p class="mt-6 text-black font-normal text-2xl">
                You can head back to the main page
              </p>
            </h1>
            <button
              onClick={() => {
                route("/");
              }}
              className="h-12 mt-4 rounded-3xl bg-green-700 px-6 text-center text-sm text-white hover:bg-black  disabled:bg-slate-300 disabled:text-slate-600"
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Back to home
            </button>
          </div>
        </div>
        <div class="mx-auto p-2 bg-green-700 text-white">
          <p class="font-bold text-center mb-3">Made with ♡ by Sanket</p>
        </div>
      </div>
    </>
  );
}
