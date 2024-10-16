"use server";
import { notFound } from "next/navigation";
import { SettingsForm } from "../../components/SettingForm";
import prisma from "../../lib/db";
import { requireUser } from "../../lib/hooks";

async function getData(userId:string) {
    const data= await prisma.user.findUnique({
        where: {
            id:userId
        },
        select: {
            name: true,
            email: true,
            image:true,
        },
    })

    if(!data){
        return notFound();
    }

    return data;
}
export default async function settingRoute() {
    const session = await requireUser();
    const data=await getData(session.user?.id as string);
    return (
        <div>
            <SettingsForm 
            email={data.email} 
            fullname={data.name as string}
            profileImage={data.image as string}
            />
        </div>
    );
}