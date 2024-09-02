import { ApolloProvider } from "@apollo/client";
import { render } from "preact";
import Router, { Route } from "preact-router";

import { UserContext, UserInfo } from "./GlobalContext/UserInfo";
import client from "./apollo-client";
import { App } from "./app";
import { Register } from "./components/register";
import { useSessionStorage } from "./hooks/useSessionStorage";
import "./index.css";
import { ErrorPage } from "./pages/404";
import { Dashboard } from "./pages/Dashboard";
import { CreateForm } from "./pages/createForm";
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
                        <Route default component={ErrorPage} />
                        <Route
                            path="/eventDetail/:id?/:name?/:userId?"
                            component={EventDetailPage}
                        />
                    </Router>
                </UserContext.Provider>
            </ApolloProvider>
        </>
    );
}

render(<Main />, document.getElementById("app")!);
