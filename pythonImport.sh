#!/bin/bash

# Bash script to install the necessary Python packages

# Ensure pip is up-to-date
python3 -m pip install --upgrade pip

# Install the required packages
packages=(
    "os"
    "folium"
    "networkx"
    "geopy"
    "requests"
    "polyline"
    "functools-lru-cache"
    "concurrent.futures"
    "Flask"
    "Flask_Cors"
)

for package in "${packages[@]}"
do
   python3 -m pip install "$package"
done

echo "All packages have been installed successfully."
