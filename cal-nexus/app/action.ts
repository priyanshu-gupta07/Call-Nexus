"use server";

import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import { parseWithZod } from '@conform-to/zod'
import { OnboardingSchemaValidation, settingsSchema } from "./lib/zodSchemas";
import { redirect } from "next/navigation";

export async function onboardingAction(prevState:any,formData: FormData) {
    const session =await requireUser();
    
    const submission = await parseWithZod(formData, {
        schema: OnboardingSchemaValidation({
            async isUsernameUnique() {
                const existingUser = await prisma.user.findUnique({
                    where: {
                        username: formData.get("userName") as string,
                    },
                });

                return !existingUser;
            }
        }),

        async: true,
    });

    if(submission.status !== "success"){
        return submission.reply();
    }

    const data = await prisma.user.update({
        where: {
            id: session.user?.id
        },
        data: {
            username: submission.value.userName,
            name: submission.value.fullName,
        }
    });

    return redirect("/onboarding/grant-id");
};

export async function SettingsAction(prevState:any,formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: settingsSchema,
    });

    if(submission.status !== "success"){
        return submission.reply();
    }

    const user = await prisma.user.update({
        where: {
            id: session.user?.id
        },
        data: {
            name: submission.value.fullName,
            image: submission.value.profileImage,
        }
    });

    return redirect("/dashboard");
}