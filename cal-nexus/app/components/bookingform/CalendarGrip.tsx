import {useCalendarGrid, useLocale} from 'react-aria';
import {DateDuration, DateValue, endOfMonth, getWeeksInMonth} from '@internationalized/date';
import {CalendarState} from '@react-stately/calendar';
import CalendarCell from './CalendarCell';

export default function CalendarGrid({ 
    state,
    offset ={} ,
    isDateunavailable,
    }:
    {state:CalendarState,
    offset?: DateDuration,
    isDateunavailable?:(date:DateValue)=>boolean;
    }){
        const startDate = state.visibleRange.start.add(offset);
        const endDate = endOfMonth(startDate);
    let { locale } = useLocale();
    let { gridProps, headerProps, weekDays } =
        useCalendarGrid({
            startDate,
            endDate,
            weekdayStyle:'short',
            },
            state
        );

    let weeksInMonth = getWeeksInMonth(
        startDate,
        locale,
    );

    return (
        <table {...gridProps} cellPadding={0} className='flex-1'>
        <thead {...headerProps} className='text-sm font-medium'>
            <tr>
            {weekDays.map((day, index) => (
                <th key={index}>{day}</th>
            ))}
            </tr>
        </thead>
        <tbody>
            {[...new Array(weeksInMonth).keys()].map(
            (weekIndex) => (
                <tr key={weekIndex}>
                {state.getDatesInWeek(weekIndex).map((
                    date,
                    i
                ) => (
                    date
                    ? (
                        <CalendarCell
                        key={i}
                        state={state}
                        date={date}
                        currentMonth={startDate}
                        isUnavailable={isDateunavailable?.(date)}
                        />
                    )
                    : <td key={i} />
                ))}
                </tr>
            )
            )}
        </tbody>
        </table>
    );
}