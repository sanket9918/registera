import { useInfo } from "../GlobalContext/UserInfo";
import { Link, route } from "preact-router";
export function AuthHeader({}) {
  const { userInfo } = useInfo();

  return (
    <div>
      <div class="container mx-auto">
        <div class="p-1 flex justify-between items-center">
          <Link href="/dashboard">
            <h1 class="mt-2 md:mt-[1em] text-3xl font-bold text-green-700">
              Registera
            </h1>
          </Link>
          <div class="flex items-center justify-between mt-2 md:mt-[1em] space-x-3">
            <h1 class=" text-base font-bold">Hi {userInfo.name}</h1>
            <button
              onClick={async () => {
                await sessionStorage.removeItem("user");
                await route("/", true);
              }}
            >
              <p>Logout</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
