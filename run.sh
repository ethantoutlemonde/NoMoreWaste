#!/bin/bash


gnome-terminal -- bash -c "cd ./back-end/ && php artisan serve; exec bash"

gnome-terminal -- bash -c "cd ./back-office/ && npm run dev; exec bash"

gnome-terminal -- bash -c "cd ./front-end/ && npm run dev; exec bash"

gnome-terminal -- bash -c "cd ./back-end/mapPlan/ && flask run; exec bash"
