'use client';

import { useCalendar,useLocale} from "react-aria"
import {useCalendarState} from 'react-stately';
import {createCalendar} from '@internationalized/date';
import { CalendarProps, DateValue } from "@react-types/calendar";
import { CalendarHeader } from "./CalenderHeader";
import CalendarGrid from "./CalendarGrip";

export function Calender(props: CalendarProps<DateValue> &{
    isDateunavailable?:(date:DateValue)=>boolean;
}) {
    const {locale }=useLocale();
    let state = useCalendarState({
        ...props,
        visibleDuration:{months:1},
        locale,
        createCalendar
      });

      let {
        calendarProps,
        prevButtonProps,
        nextButtonProps,
        title
      } = useCalendar(props, state);
    return (
        <div {...calendarProps} className="inline-block">
            <CalendarHeader 
            state={state}
            calendarProps={calendarProps}
            prevButtonProps={prevButtonProps}
            nextButtonProps={nextButtonProps}
            />

            <div className="flex gap-8">
                <CalendarGrid state={state} isDateunavailable={props.isDateUnavailable} />
            </div>
        </div>
    )
}