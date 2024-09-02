import { AuthChecker } from "type-graphql";

import Context from "../types/context";

const authChecker: AuthChecker<Context> = ({ context }, roles) => {
    if (roles.length === 0) {
        // if `@Authorized()`, check only if user exists
        return context.user !== undefined;
    }

    if (!context.user) {
        return false; // No user , restrict access
    }
    if (context.user.roles.some((role) => roles.includes(role))) {
        // grant access if the roles overlap
        return true;
    }
    return false; // To check if the value returns a user (True) or null (False) -> Explicit boolean conversion;
};

export default authChecker;
