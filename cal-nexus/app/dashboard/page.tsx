import { notFound } from "next/navigation";
import prisma from "../lib/db";
import {requireUser} from "../lib/hooks";
import { EmptyStates } from "../components/Emptystate";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { ExternalLink, Link2, Pen, Settings, Trash, User2 } from "lucide-react";
import { Switch } from "../../components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";

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
            <>
            <div className="flex items-center justify-between px-2">
                <div className="hidden sm:grid gap-y-1">
                    <h1 className="text-3xl md:text-4xl font-semibold">Event Types</h1>
                    <p className="text-muted-foreground">create and Manage your Events here!</p>
                </div>
                <Button asChild>
                    <Link href="dashboard/new">
                        Add New Event
                    </Link>
                </Button>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {data.eventType.map((event) => (
                    <div className="overflow-hidden shadow rounded-lg border relative"
                    key={event.id}>

                        <div className="absolute top-2 right-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Settings className="size-4"/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        Event
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem asChild>
                                            <Link href={`/${data.username}/${event.url}`}>
                                                <ExternalLink className="size-4 mr-2"/>
                                                Preview
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem >
                                                <Link2 className="size-4 mr-2"/>
                                                Copy
                                        </DropdownMenuItem>
                                        <DropdownMenuItem >
                                                <Pen className="size-4 mr-2"/>
                                                Edit
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem >
                                            <Trash className="size-4 mr-2"/>
                                                Delete
                                        </DropdownMenuItem>
                                </DropdownMenuContent>

                            </DropdownMenu>
                        </div>
                        <Link href="/" className="flex items-center p-5 ">
                        <div className="flex-shrink-0">
                            <User2 className="size-6" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-muted-foreground">
                                    {event.duration} Minutes Meeting
                                </dt>
                                <dd>
                                    {event.title}
                                </dd>
                            </dl>
                        </div>
                        </Link>
                        <div className="bg-muted px-5 py-3 flex justify-between items-center">
                            <Switch />
                            <Button>
                                Edit Event
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            </>
        )}
        </>
    );
}