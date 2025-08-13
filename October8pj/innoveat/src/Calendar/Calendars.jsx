
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import './Calendar.css';
import Navbar from "../Navbar/Navbar"; 


const Calendars = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
 
    const nextMonth = () => {
        setCurrentDate(prevDate => addDays(endOfMonth(prevDate), 1));
    };
 
    const prevMonth = () => {
        setCurrentDate(prevDate => addDays(startOfMonth(prevDate), -1));
    };
 
    const renderCalendarCells = () => {
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";
 
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, "d");
                const cloneDay = day;
                days.push(
                    <td
                        key={day}
                        className={`${!isSameMonth(day, monthStart) ? "disabled" : ""} ${isSameDay(day, new Date()) ? "today" : ""}`}
                        onClick={() => console.log(`Selected date: ${format(cloneDay, "yyyy-MM-dd")}`)}
                    >
                        <span>{formattedDate}</span>
                    </td>
                );
                day = addDays(day, 1);
            }
            rows.push(<tr key={day}>{days}</tr>);
            days = [];
        }
        return rows;
    };
 
    return (
        <>
       <Navbar />
        <div className="container">
 
            <div className="contents">
                <h1>CALENDAR</h1>
                <div className="calendar-section">
                    <div className="calendar">
                        <div className="calendar-header">
                            <button onClick={prevMonth}>&lt;</button>
                            <h2>{format(currentDate, "MMMM yyyy")}</h2>
                            <button onClick={nextMonth}>&gt;</button>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Sun</th>
                                    <th>Mon</th>
                                    <th>Tue</th>
                                    <th>Wed</th>
                                    <th>Thu</th>
                                    <th>Fri</th>
                                    <th>Sat</th>
                                </tr>
                            </thead>
                            <tbody>{renderCalendarCells()}</tbody>
                        </table>
                    </div>
                
                </div>
            
                <div className="buttons">
                  
                </div>
            </div>
        </div>
        </>
    );
};
 
export default Calendars