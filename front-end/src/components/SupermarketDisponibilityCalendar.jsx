import React, { useState, useEffect } from 'react';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import axiosClient from '../axios-client';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function SupermarketDisponibilityCalendar({supermarket_id , disponibilities , fetchDisponibilities}) {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();
    const [selectedDisponibility, setSelectedDisponibility] = useState(null);
    const { t } = useTranslation("global");

    disponibilities = disponibilities.map(disponibility => ({
        id: disponibility.id,
        date: dayjs(disponibility.date),
    }));

    const handleClose = () => {
        setOpenDialog(false);
        setSelectedDisponibility(null);  
    };

    const handleDelete = () => {
        if (selectedDisponibility) {
            console.log('delete', selectedDisponibility)
            axiosClient.delete(`api/supermarket/disponibility/${selectedDisponibility.id}`)
            .then(() => {
                setOpenDialog(false);
                setSelectedDisponibility(null);
                // fetchDisponibilities();
                // disponibilities = disponibilities.filter(disponibility => disponibility.id !== selectedDisponibility.id);
                fetchDisponibilities();
            })
            .catch(error => {
                console.error("Error deleting disponibility:", error);
            });
        }
        
    }

    const DisponibilityDay = (props) => {
        const { day, outsideCurrentMonth, ...other } = props;

        const disponibility = disponibilities.find(disponibilityDate => 
            disponibilityDate.date.isSame(day, 'day')
        );

        const handleClick = () => {
            if (disponibility) {
                // navigate(`/food_aid/food_collections/${disponibility.id}`);
                console.log('click',disponibility.id)
                setOpenDialog(true);
                setSelectedDisponibility(disponibility);
            }
        };

        

        return (
            <>
            <Badge
                key={day.toString()}
                overlap="circular"
                badgeContent={disponibility ? '🔴' : undefined}
            >
                <PickersDay {...other} day={day} outsideCurrentMonth={outsideCurrentMonth} onClick={handleClick} />
            </Badge>
            
            </>
        );
    };

    return (
        <div className='bg-white rounded-xl shadow p-4'>
            <DateCalendar
                value={selectedDate}
                onChange={(newDate) => setSelectedDate(newDate)}
                slots={{
                    day: DisponibilityDay,
                }}
            />
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>{t("Disponibility")}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t("Are you sure you want to delete this availability?")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose} className="bg-gray-50 p-2 rounded hover:bg-gray-100">
                        {t("Cancel")}
                    </button>
                    <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
                        {t("Delete")}
                    </button>
                </DialogActions>
            </Dialog>
        </div>

    );
}