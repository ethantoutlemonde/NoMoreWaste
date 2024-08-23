// import React, { useState, useEffect } from 'react';
// import Badge from '@mui/material/Badge';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { PickersDay } from '@mui/x-date-pickers/PickersDay';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import axiosClient from '../../../axios-client';
// import dayjs, { Dayjs } from 'dayjs';

import FoodCollectionCalendar from "../../../components/FoodCollectionCalendar";

export default function FoodCollections() {
    // const [selectedDate, setSelectedDate] = useState(dayjs());
    // const [foodCollections, setFoodCollections] = useState([]);

    // useEffect(() => {
    //     axiosClient.get('/api/foodCollection')
    //         .then(response => {
    //             const collections = response.data.map(collection => dayjs(collection.date));
    //             setFoodCollections(collections);
    //             console.log("Fetched food collections:", response);
    //         })
    //         .catch(error => {
    //             console.error("Error fetching food collections:", error);
    //         });
    // }, []);

    // const FoodCollectionDay = (props) => {
    //     const { day, outsideCurrentMonth, ...other } = props;

    //     const isFoodCollectionDay = foodCollections.some(collectionDate => 
    //         collectionDate.isSame(day, 'day')
    //     );

    //     return (
    //         <Badge
    //             key={day.toString()}
    //             overlap="circular"
    //             badgeContent={isFoodCollectionDay ? '🌟' : undefined}
    //         >
    //             <PickersDay {...other} day={day} outsideCurrentMonth={outsideCurrentMonth} />
    //         </Badge>
    //     );
    // };

    return (

            // <DateCalendar
            //     value={selectedDate}
            //     onChange={(newDate) => setSelectedDate(newDate)}
            //     slots={{
            //         day: FoodCollectionDay,
            //     }}
            // />
            <div className="flex flex-col w-96 bg-white p-10 rounded-lg mt-4 m-auto shadow">
                <FoodCollectionCalendar />
            </div>

            
    );
}