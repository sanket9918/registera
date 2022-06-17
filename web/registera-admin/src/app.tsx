import { Header } from "./components/header";
import { Login } from "./components/login";

export function App() {
  return (
    <>
      <div class="min-h-screen bg-slate-100">
        <Header />
        {/* Login */}
        <Login />
      </div>
    </>
  );
}
