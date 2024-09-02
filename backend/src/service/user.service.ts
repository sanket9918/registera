import { ApolloError } from "apollo-server";
import bcrypt from "bcrypt";

import {
    CreateUserInput,
    LoginInput,
    UserModel,
    UserToken,
} from "../schema/user.schema";
import Context from "../types/context";
import { signJwt } from "../utils/jwt";

class UserService {
    async createUser(input: CreateUserInput) {
        const errorAlreadyExists = "Email ID already Exists";
        const user = await UserModel.find().findByEmail(input.email).lean();
        if (user) {
            throw new ApolloError(errorAlreadyExists);
        }
        return UserModel.create(input);
    }

    async loginUser(input: LoginInput, context: Context) {
        const errorMessage = "Invalid email or password";

        const user = await UserModel.find().findByEmail(input.email).lean();

        if (!user) {
            throw new ApolloError(errorMessage);
        }

        // Validate the password

        const passwordValidity = await bcrypt.compare(
            input.password,
            user.password,
        );
        if (!passwordValidity) {
            throw new ApolloError(errorMessage);
        }

        //   Sign the JWT token
        const token = signJwt(user);

        //   Cookie to store the token

        context.res.cookie("accessToken", token, {
            maxAge: 3.154e10, // 1 year
            httpOnly: true,
            domain: "localhost",
            path: "/",
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        let payload = new UserToken();

        payload.token = token;

        //   Return the jwt
        return payload;
    }

    async logoutUser(context: Partial<Context>) {
        const errorMessageLogout = "Something went wrong. Couldn't log out";
        try {
            context.res!.clearCookie("accessToken");
            return "Succesfully logged out";
        } catch (e) {
            throw new ApolloError(errorMessageLogout);
        }
    }
}

export default UserService;
