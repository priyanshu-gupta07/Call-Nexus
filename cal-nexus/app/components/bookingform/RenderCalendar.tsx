"use client";

import { useEffect, useState } from "react";
import { Calender } from "../../../app/components/bookingform/Calander";
import { today, getLocalTimeZone, DateValue, parseDate,CalendarDate} from "@internationalized/date";
import {  useRouter, useSearchParams } from "next/navigation";

interface iAppProps {
   availability:{
    day: string;
    isActive: boolean;
   }[];
}


const RenderCalendar = ({availability}:iAppProps) => {

  const SearchParam=useSearchParams();
  const router=useRouter();

  const [date,setDate]=useState(() => {
     const dateParam= SearchParam.get('date');

     return dateParam ? parseDate(dateParam) : today(getLocalTimeZone());
  });

  useEffect(() =>{
    const dateParam = SearchParam.get("date");

    if(dateParam) {
      setDate(parseDate(dateParam));
    }
  },[SearchParam])

  const handleDateChange = (date:DateValue) =>{
    setDate(date as CalendarDate);

    const url=new URL(window.location.href);

    url.searchParams.set("date",date.toString());

    router.push(url.toString());
  }
  const isDateUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();

    const adjustedIndex= dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    
    return !availability[adjustedIndex].isActive;
  }
  return (
    <div>
        <Calender onChange={handleDateChange} value={date} minValue={today(getLocalTimeZone())} isDateUnavailable={isDateUnavailable}/>
    </div>
  )
}

export default RenderCalendar