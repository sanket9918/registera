import type { ComponentChildren } from "preact";
import { route } from "preact-router";
import { useEffect } from "preact/hooks";

import { AuthHeader } from "./authHeader";

type Props = {
    children: ComponentChildren;
};
export function AuthBody(props: Props) {
    useEffect(() => {
        if (!sessionStorage.getItem("user")) {
            // Any other logic can be used here....This is the simplest that works for demo here
            route("/", true);
        }
    }, []);
    return (
        <div class="bg-slate-100 min-h-screen">
            <AuthHeader />
            <div class="container mx-auto p-2 min-h-screen">
                {props.children}
            </div>
            <div class="mx-auto p-2 bg-green-700 text-white">
                <p class="font-bold text-center mb-3">Made with ♡ by Sanket</p>
            </div>
        </div>
    );
}
