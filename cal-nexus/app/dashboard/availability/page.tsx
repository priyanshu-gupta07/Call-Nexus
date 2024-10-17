import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import prisma from "../../lib/db";
import { requireUser } from "../../lib/hooks";
import { Switch } from "../../../components/ui/switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { times } from "../../lib/times";
import { SubmitButton } from "../../components/SubmitButtons";
import { updateAvailabilityAction } from "../../action";

async function getAvailability(userId: string) {
    const data = await prisma.availability.findMany({
       where: {
              userId:userId
       }, 
    });

    if(!data) {
        return notFound();
    }

    return data;

}
export default async function AvailabilityPage() {
    const session = await requireUser();
    const data = await getAvailability(session.user?.id as string);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Availability</CardTitle>
                <CardDescription>Manage your Availability here!</CardDescription>
            </CardHeader>
            <form action={updateAvailabilityAction}>
                <CardContent className="flex flex-col gap-4">
                    {data.map((item) => (
                        <div 
                        key={item.id}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                        items-center gap-4"
                        >
                            <input type="hidden" name={`id-${item.id}`} value={item.id}/>
                           <div className="flex items-center gap-x-3">
                                <Switch name={`isActive-${item.id}`} defaultChecked={item.isActive} />
                                <p>{item.day}</p>
                           </div>
                           <Select name={`fromTime-${item.id}`} defaultValue={item.fromTime}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="From time" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {times.map((time) => (
                                        <SelectItem value={time.time} key={time.id}>
                                            {time.time}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                           </Select>

                           <Select name={`tillTime-${item.id}`} defaultValue={item.tillTime}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Till time" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {times.map((time) => (
                                        <SelectItem value={time.time} key={time.id}>
                                            {time.time}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                           </Select>
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
                    <SubmitButton text="Save Changes"/>
                </CardFooter>
            </form>
        </Card>
    )
}