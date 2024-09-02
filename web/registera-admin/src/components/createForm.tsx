import { ErrorMessage, Field, Form, Formik } from "formik";
import { route } from "preact-router";
import * as yup from "yup";

import useCreateForm from "../hooks/useCreateForm";

export function NewEventForm({}) {
    const [createform] = useCreateForm();
    return (
        <Formik
            initialValues={{
                name: "",
                description: "",
                // questions: [],
            }}
            onSubmit={async (val) => {
                await createform({
                    variables: {
                        name: val.name,
                        description: val.description,
                        questions: [],
                    },
                    onCompleted: async () => {
                        // route("/dashboard", true);
                        alert("Form successfully created!");
                        route("/dashboard");
                    },
                });
            }}
            validationSchema={yup.object({
                name: yup
                    .string()
                    .required("Please enter the name of the event"),
                description: yup
                    .string()
                    .required("Please enter a short description of the event"),
            })}
        >
            {(props: any) => (
                <div class="h-[70vh] md:mt-[7em] mx-auto justify-center items-center">
                    <div class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10 ">
                        <div class="mx-auto max-w-md">
                            <div class="divide-y divide-gray-300/50">
                                <div class="space-y-2 py-8 text-base leading-7 text-grey-600">
                                    <p class="text-2xl text-green-700 font-bold">
                                        {" "}
                                        Create Form{" "}
                                    </p>
                                    {/* Input here */}
                                    <div class="mt-8">
                                        <Form>
                                            {/* Email */}
                                            <label htmlFor="name">
                                                Name of the event
                                            </label>
                                            <Field
                                                name="name"
                                                className="block w-full border-b-2 border-b-slate-400 bg-transparent  py-2 text-black focus:border-b-primary  focus:outline-none  lg:max-w-3xl"
                                                type="text"
                                            />
                                            <div className="block text-red-500">
                                                <ErrorMessage name="name"></ErrorMessage>
                                            </div>

                                            {/* Password */}
                                            <label htmlFor="description">
                                                Description of the event
                                            </label>
                                            <Field
                                                name="description"
                                                className="block w-full border-b-2 border-b-slate-400 bg-transparent  py-2 text-black focus:border-b-primary  focus:outline-none  lg:max-w-3xl"
                                                type="text"
                                            />
                                            <div className="block text-red-500">
                                                <ErrorMessage name="description"></ErrorMessage>
                                            </div>
                                            <button
                                                type="submit"
                                                className="h-12 mt-6 rounded-3xl bg-green-700 px-6 text-center text-sm text-white hover:bg-black  disabled:bg-slate-300 disabled:text-slate-600"
                                                disabled={
                                                    props.isValid === false
                                                }
                                            >
                                                Create Form
                                            </button>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    );
}
