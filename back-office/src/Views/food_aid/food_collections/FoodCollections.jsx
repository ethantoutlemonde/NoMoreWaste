import { useState, useEffect } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import axiosClient from '../../../axios-client';
import dayjs from 'dayjs';

export default function FoodCollections() {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [foodCollections, setFoodCollections] = useState([]);

    useEffect(() => {
        console.log("Fetching food collections...");
        axiosClient.get('/api/foodCollection')
            .then(response => {
                console.log("API response:", response.data);
                const collections = response.data.map(collection => ({
                    ...collection,
                    date: dayjs(collection.date)
                }));
                setFoodCollections(collections);
            })
            .catch(error => {
                console.error("Error fetching food collections:", error);
            });
    }, []);

    // Convert data to MUI's required format
    foodCollections.map(item => (console.log(item.date)));
    const events = foodCollections.map(item => ({
        id: item.id,
        title: 'Food Collection',
        start: dayjs(item.date).toDate(),
        end: dayjs(item.date).add(1, 'day').toDate(), // Example: Adjust as needed
    }));

    const renderDay = (date) => {
        const dateString = date.format('YYYY-MM-DD');
        const hasEvents = events.some(event => dayjs(event.start).format('YYYY-MM-DD') === dateString);
        return (
            <div style={{ position: 'relative' }}>
                {date.date()}
                {hasEvents && <div style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'red', width: '5px', height: '5px', borderRadius: '50%' }} />}
            </div>
        );
    };
    return(
        <>
        Food Collections
        <DateCalendar
                value={selectedDate}
                onChange={(newDate) => setSelectedDate(newDate)}
                renderDay={renderDay}
            />
        </>
    )
}