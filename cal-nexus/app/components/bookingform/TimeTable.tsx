import {format} from "date-fns"
import prisma from "../../lib/db";

interface iAppProps{
    selectedDate: Date;
}

async function getdata(username:string) {
    const data = await prisma.availability.findFirst({
        where:{
            day: "Monday",
            User:{
                username: username,
            }
        }
    })
}
export function TimeTable({selectedDate} : iAppProps) {
    return(
        <div>
            <p className="text-base font-semibold">
                {format(selectedDate, "EEE")}
                {" "}
                <span className="text-sm text-muted-foreground">{format(selectedDate,"MMM.d")}</span>
            </p>
        </div>
    )
}