import { ErrorMessage, Field, Form, Formik } from "formik";
import { route } from "preact-router";
import { useState } from "preact/hooks";
import * as yup from "yup";

import useRegister from "../hooks/useRegister";
import { Header } from "./header";

export function Register({}) {
    const [register] = useRegister();
    const [generalError, setGeneralError] = useState("");
    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                password: "",
                roles: ["ADMIN"],
            }}
            onSubmit={async (val) => {
                await register({
                    variables: {
                        email: val.email,
                        password: val.password,
                        name: val.name,
                        roles: val.roles,
                    },
                    onCompleted: async () => {
                        route("/");

                        // route("/dashboard", true);
                    },
                    onError: (data) => {
                        setGeneralError(data.message);
                    },
                });
            }}
            validationSchema={yup.object({
                name: yup.string().required("Please enter you name."),
                email: yup
                    .string()
                    .email("Invalid email address")
                    .required("Please enter the email address"),
                password: yup
                    .string()
                    .required("Password is required")
                    .min(
                        6,
                        "Password is short and should be combination of Uppercase, Lowercase, Symbol and Numeric ",
                    ),
            })}
        >
            {(props: any) => (
                <>
                    <div class="bg-slate-100 min-h-screen">
                        <Header />
                        <div class="h-[70vh] md:mt-[7em] mx-auto justify-center items-center">
                            <div class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10 ">
                                <div class="mx-auto max-w-md">
                                    <div class="divide-y divide-gray-300/50">
                                        <div class="space-y-2 py-8 text-base leading-7 text-grey-600">
                                            <p class="text-2xl text-green-700 font-bold">
                                                {" "}
                                                Register{" "}
                                            </p>
                                            {/* Input here */}
                                            <div class="mt-8">
                                                <Form>
                                                    {/* Name */}
                                                    <label htmlFor="name">
                                                        Name
                                                    </label>
                                                    <Field
                                                        name="name"
                                                        className="block w-full border-b-2 border-b-slate-400 bg-transparent  py-2 text-black focus:border-b-primary  focus:outline-none  lg:max-w-3xl"
                                                        type="text"
                                                    />
                                                    <div className="block text-red-500">
                                                        <ErrorMessage name="name"></ErrorMessage>
                                                    </div>
                                                    {/* Email */}
                                                    <label htmlFor="email">
                                                        Email
                                                    </label>
                                                    <Field
                                                        name="email"
                                                        className="block w-full border-b-2 border-b-slate-400 bg-transparent  py-2 text-black focus:border-b-primary  focus:outline-none  lg:max-w-3xl"
                                                        type="text"
                                                    />
                                                    <div className="block text-red-500">
                                                        <ErrorMessage name="email"></ErrorMessage>
                                                    </div>

                                                    {/* Password */}
                                                    <label htmlFor="password">
                                                        Password
                                                    </label>
                                                    <Field
                                                        name="password"
                                                        className="block w-full border-b-2 border-b-slate-400 bg-transparent  py-2 text-black focus:border-b-primary  focus:outline-none  lg:max-w-3xl"
                                                        type="password"
                                                    />
                                                    <div className="block text-red-500">
                                                        <ErrorMessage name="password"></ErrorMessage>
                                                    </div>
                                                    <div className="block text-red-500">
                                                        {generalError}
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        className="h-12 mt-6 rounded-3xl bg-green-700 px-6 text-center text-sm text-white hover:bg-black  disabled:bg-slate-300 disabled:text-slate-600"
                                                        disabled={
                                                            props.isValid ===
                                                            false
                                                        }
                                                    >
                                                        Register
                                                    </button>
                                                </Form>
                                            </div>
                                        </div>

                                        <div class="pt-8 text-base font-semibold leading-7">
                                            <p class="text-gray-900">
                                                Already have an account?
                                            </p>
                                            <p>
                                                <a
                                                    href="/"
                                                    class="text-green-700"
                                                >
                                                    Login
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mx-auto p-2 bg-green-700 text-white">
                            <p class="font-bold text-center mb-3">
                                Made with ♡ by Sanket
                            </p>
                        </div>
                    </div>
                </>
            )}
        </Formik>
    );
}
