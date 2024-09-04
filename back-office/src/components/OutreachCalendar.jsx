import React, { useState, useEffect } from 'react';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import axiosClient from '../axios-client';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';

export default function OutreachCalendar() {
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
                navigate(`/food_aid/outreachs/${outreach.id}`);
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
        <DateCalendar
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            slots={{
                day: OutreachDay,
            }}
        />

    );
}