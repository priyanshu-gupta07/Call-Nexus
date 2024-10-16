"use client";

import { useFormState } from "react-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { onboardingAction } from "../action";
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod";
import { OnboardingSchema } from "../lib/zodSchemas";
import { SubmitButton } from "../components/SubmitButtons";

export default function OnboardingRoute() {
    const [lastResult , action] = useFormState(onboardingAction, undefined);

    const [form, fields] = useForm({
        lastResult,
        
        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: OnboardingSchema,
            });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });
    return (
        <div className="min-h-screen w-screen flex justify-center items-center">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Welcome to Cal <span className="text-primary">Nexus</span>
                    </CardTitle>
                    <CardDescription>
                        Fill up the information to start with us :)
                    </CardDescription>
                </CardHeader>
                <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                    <CardContent className="flex flex-col gap-y-5 ">
                        <div className="grid gap-y-2">
                            <Label>Full Name</Label>
                            <Input
                                name={fields.fullName.name}
                                defaultValue={fields.fullName.initialValue}
                                key={fields.fullName.key}
                                placeholder="full name" />
                            <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
                        </div>
                        <div className="grid gap-y-2">
                            <Label>Username</Label>
                            <div className="flex rounded-md">
                                <span className="inline-flex items-center px-3
                                rounded-l-md border-r-0 border-muted bg-muted
                                text-sm text-muted-foreground">
                                    CalNexus.com/</span>
                                <Input className="rounded-l-none"
                                    name={fields.userName.name}
                                    defaultValue={fields.userName.initialValue}
                                    key={fields.userName.key}
                                    placeholder="username" />
                            </div>
                            <p className="text-red-500 text-sm">{fields.userName.errors}</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <SubmitButton text="Submit" className="w-full"/>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}