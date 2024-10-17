import { notFound } from "next/navigation";
import prisma from "../lib/db";
import {requireUser} from "../lib/hooks";
import { EmptyStates } from "../components/Emptystate";

async function getDashboardData(userId: string) {
    const data = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            username: true,
            eventType:{
                select:{
                    id: true,
                    title: true,
                    duration: true,
                    active: true,
                    url: true,
                },
            },
        },
    });

    if (!data) {
        return notFound();
    }

    return data;
}

export default async function DashboardPage() {
    const session=await requireUser();
    const data = await getDashboardData(session.user?.id as string);
    return (
        <>
        { data.eventType.length === 0 ? (
            <EmptyStates 
                title="You have No Upcoming Events!"
                description="Click the Button to Add Events to your Calander"
                buttonText="Add Events"
                href="/dashboard/new"
                />
        ) : (
            <p>You have events</p>
        )}
        </>
    );
}