import { Link } from "preact-router";

export function Header({}) {
  return (
    <div class=" bg-green-700  text-white">
      <div class="container mx-auto">
        <div class="p-6">
          <Link href="/">
            <h1 class="mt-2 md:mt-[3em] text-3xl font-bold">Registera</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
