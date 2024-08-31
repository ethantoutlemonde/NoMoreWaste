# PowerShell script to install the necessary Python packages

# Ensure pip is up-to-date
python -m pip install --upgrade pip

# Install the required packages
$packages = @(
    "os",
    "folium",
    "networkx",
    "geopy",
    "requests",
    "polyline",
    "functools-lru-cache",
    "concurrent.futures",
    "Flask",
    "Flask_Cors"
)

foreach ($package in $packages) {
    python -m pip install $package
}

Write-Host "All packages have been installed successfully."
