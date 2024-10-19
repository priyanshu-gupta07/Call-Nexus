import { notFound } from "next/navigation";
import { Card, CardContent } from "../../../../components/ui/card";
import prisma from "../../../lib/db";
import { CalendarX2, Clock, VideoIcon } from "lucide-react";
import { Separator } from "../../../../components/ui/separator";
import RenderCalendar from "../../../components/bookingform/RenderCalendar";
import { TimeTable } from "../../../components/bookingform/TimeTable";

async function getdata(EventUrl:string,Username:string) 
{
    const data= await prisma.eventType.findFirst({
        where:{
            url:EventUrl,
            user: {
                username:Username
            },
            active:true
        },
        select:{
            id:true,
            description:true,
            title:true,
            duration:true,
            VideoCallSoftware:true,
            user:{
                select :{
                    image:true,
                    name:true,
                    availability:{
                        select:{
                            day:true,
                            isActive:true,
                        }
                    }
                }
            }
        }
    });

    if(!data){
        return notFound();
    }

    return data;
}
export default async function BookingFormRoute({
    params,
    searchParams
    } : {
        params:{eventUrl:string,Username:string};
        searchParams:{date?:string}
    }) {
    const data=await getdata(params.eventUrl,params.Username);
    const selectedDate = searchParams.date ? new Date(searchParams.date) : new Date();
    
    const formatDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
    }).format(selectedDate);

    return (
        <div 
        className="min-h-screen w-screen flex items-center justify-center">
            <Card className="max-w-[1000px] w-full mx-auto ">
                <CardContent className="p-5 grid md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-4">
                    <div>
                        <img src={data.user?.image as string} alt="profile Image" className="size-10 rounded-full"/>
                        <p className="text-sm font-medium text-muted-foreground mt-1">
                            {data.user?.name}</p>
                        <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
                        <p className="text-sm font-medium text-muted-foreground">{data.title}</p>
                        <div className="mt-5 flex flex-col gap-y-3">
                            <p className="flex items-center">
                                <CalendarX2 className="size-4 mr-2 text-primary"/>
                                <span className="text-sm font-medium text-muted-foreground">
                                    {formatDate.toString()}
                                </span>
                            </p>
                            <p className="flex items-center">
                                <Clock className="size-4 mr-2 text-primary"/>
                                <span className="text-sm font-medium text-muted-foreground">
                                   {data.duration} minutes
                                </span>
                            </p>
                            <p className="flex items-center">
                                <VideoIcon className="size-4 mr-2 text-primary"/>
                                <span className="text-sm font-medium text-muted-foreground">
                                    {data.VideoCallSoftware}
                                </span>
                            </p>
                        </div>
                    </div>
                    <Separator orientation="vertical" className="h-full w-[1px]"/>
                    <RenderCalendar availability={data.user?.availability as any}/>
                    <Separator orientation="vertical" className="h-full w-[1px]"/>
                    <TimeTable selectedDate={selectedDate}/>
                </CardContent>
            </Card>
        </div>
    )
}