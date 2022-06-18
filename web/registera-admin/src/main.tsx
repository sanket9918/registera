import { render } from "preact";
import { App } from "./app";
import "./index.css";
import Router, { Route } from "preact-router";
import { Register } from "./components/register";
import { ApolloProvider } from "@apollo/client";
import { UserContext, UserInfo } from "./GlobalContext/UserInfo";
import { useSessionStorage } from "./hooks/useSessionStorage";
import client from "./apollo-client";
import { Dashboard } from "./pages/Dashboard";
import { CreateForm } from "./pages/createForm";
import { EventDetailCard } from "./components/EventDetailCard";
import { EventDetailPage } from "./pages/eventDetails";

const initalState: UserInfo = {
  id: "",
  name: "",
  email: "",
};

function Main() {
  const [userInfo, updateInfo] = useSessionStorage("user", initalState);
  return (
    <>
      <ApolloProvider client={client}>
        <UserContext.Provider value={{ userInfo, updateInfo }}>
          <Router>
            <Route path="/" component={App} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/register" component={Register} />
            <Route path="/createForm" component={CreateForm} />
            <Route
              path="/eventDetail/:id?/:name?"
              component={EventDetailPage}
            />
          </Router>
        </UserContext.Provider>
      </ApolloProvider>
    </>
  );
}

render(<Main />, document.getElementById("app")!);
