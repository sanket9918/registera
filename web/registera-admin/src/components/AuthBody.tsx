import type { ComponentChildren } from "preact";
import { AuthHeader } from "./authHeader";
type Props = {
  children: ComponentChildren;
};
export function AuthBody(props: Props) {
  return (
    <div class="bg-slate-100 min-h-screen">
      <AuthHeader />
      <div class="container mx-auto p-2">{props.children}</div>
      <div class="mx-auto">
        <p class="font-bold text-center mb-3">Made with love by Sanket</p>
      </div>
    </div>
  );
}