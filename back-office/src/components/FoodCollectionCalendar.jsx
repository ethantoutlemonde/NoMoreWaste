import React, { useState, useEffect } from 'react';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import axiosClient from '../axios-client';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';

export default function FoodCollectionCalendar() {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [foodCollections, setFoodCollections] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get('/api/foodCollection')
            .then(response => {
                const collections = response.data.map(collection => ({
                    id: collection.id,
                    date: dayjs(collection.date),
                }));
                setFoodCollections(collections);
                console.log("Fetched food collections:", response.data);
            })
            .catch(error => {
                console.error("Error fetching food collections:", error);
            });
    }, []);

    const FoodCollectionDay = (props) => {
        const { day, outsideCurrentMonth, ...other } = props;

        const foodCollection = foodCollections.find(collectionDate => 
            collectionDate.date.isSame(day, 'day')
        );

        const handleClick = () => {
            if (foodCollection) {
                navigate(`/food_aid/food_collections/${foodCollection.id}`);
            }
        };

        return (
            <Badge
                key={day.toString()}
                overlap="circular"
                badgeContent={foodCollection ? '🔴' : undefined}
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
                day: FoodCollectionDay,
            }}
        />

    );
}