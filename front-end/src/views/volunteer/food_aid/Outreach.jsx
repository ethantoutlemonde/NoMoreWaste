import React, { useState, useEffect } from 'react';
import axiosClient from "../../../axios-client"
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Badge from '@mui/material/Badge';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';

export default function Outreach() {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [outreachs, setOutreachs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get('/api/outreach')
            .then(response => {
                const collections = response.data.map(collection => ({
                    id: collection.id,
                    date: dayjs(collection.date),
                }));
                setOutreachs(collections);
                console.log("Fetched food collections:", response.data);
            })
            .catch(error => {
                console.error("Error fetching food collections:", error);
            });
    }, []);

    const OutreachDay = (props) => {
        const { day, outsideCurrentMonth, ...other } = props;

        const outreach = outreachs.find(collectionDate => 
            collectionDate.date.isSame(day, 'day')
        );

        const handleClick = () => {
            if (outreach) {
                navigate(`${outreach.id}`);
            }
        };

        return (
            <Badge
                key={day.toString()}
                overlap="circular"
                badgeContent={outreach ? '🔴' : undefined}
            >
                <PickersDay {...other} day={day} outsideCurrentMonth={outsideCurrentMonth} onClick={handleClick}/>
            </Badge>
        );
    };
    return (
        <div>
            <h1>Food Collection</h1>
            <DateCalendar
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            slots={{
                day: OutreachDay,
            }}
        />
        </div>
    )
}