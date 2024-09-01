import os
import folium
import networkx as nx
from geopy.distance import geodesic
from geopy.geocoders import Nominatim
from folium.plugins import PolyLineTextPath
import requests
from polyline import decode
from functools import lru_cache
from concurrent.futures import ThreadPoolExecutor

API_KEY = "AIzaSyAw1h04W7X9oCaKcZk-VuuoDVGL7XExins"

@lru_cache(maxsize=None)
def get_coordinates(place):
    geolocator = Nominatim(user_agent="my_application")
    location = geolocator.geocode(place)
    if location:
        coordinates = (location.latitude, location.longitude)
        return coordinates
    else:
        print(f"Impossible de trouver les coordonnées pour l'adresse : {place}")
        return None

def calculate_distance(origin, destination):
    origin_coordinates = get_coordinates(origin)
    destination_coordinates = get_coordinates(destination)
    if origin_coordinates and destination_coordinates:
        distance = geodesic(origin_coordinates, destination_coordinates).kilometers
        return distance
    else:
        return None

def build_graph(points):
    G = nx.Graph()
    for i, origin in enumerate(points):
        for j, destination in enumerate(points):
            if i != j:
                distance = calculate_distance(origin, destination)
                if distance is not None:
                    G.add_edge(origin, destination, weight=distance)
    return G

def find_optimal_order(G, origin, destination, points):
    optimal_order = [origin]
    current_node = origin
    unvisited = set(points)
    unvisited.remove(origin)
    while unvisited:
        nearest_node = None
        min_distance = float('inf')
        for neighbor in unvisited:
            if G.has_edge(current_node, neighbor):
                distance = G[current_node][neighbor]['weight']
                if distance < min_distance:
                    min_distance = distance
                    nearest_node = neighbor
        if nearest_node is not None:
            optimal_order.append(nearest_node)
            unvisited.remove(nearest_node)
            current_node = nearest_node
        else:
            break
    optimal_order.append(destination)
    return optimal_order

def save_map(m):
    dossier_actuel = os.path.dirname(os.path.abspath(__file__))
    chemin_fichier_html = os.path.join(dossier_actuel, "../../back-office/public", "trajet.html")
    print(f"Saving map to: {chemin_fichier_html}")
    m.save(chemin_fichier_html)
    print(f"Carte sauvegardée sous {chemin_fichier_html}!")

def main(points): 
    origin = points[0]
    destination = points[-1]
    other_points = points[1:-1]
    
    G = build_graph(points)
    
    if origin not in points:
        print("L'adresse de départ n'est pas valide.")
        return
    if destination not in points:
        print("L'adresse de fin n'est pas valide.")
        return
    
    optimal_order = find_optimal_order(G, origin, destination, points)  

    m = folium.Map(location=get_coordinates(origin), zoom_start=6)

    with ThreadPoolExecutor() as executor:
        futures = []
        for i in range(len(optimal_order) - 1):
            origin = optimal_order[i]
            destination = optimal_order[i + 1]
            distance = calculate_distance(origin, destination)
            origin_coordinates = get_coordinates(origin)
            destination_coordinates = get_coordinates(destination)
            if distance is not None:
                if i == 0:
                    marker_color = "green"
                elif i == len(optimal_order) - 2:
                    marker_color = "red"
                else:
                    marker_color = "blue"
                folium.Marker(location=origin_coordinates, popup=f"Départ ({origin})", icon=folium.Icon(color=marker_color)).add_to(m)

    with ThreadPoolExecutor() as executor:
        futures = []
        for i in range(len(optimal_order) - 1):
            origin = optimal_order[i]
            destination = optimal_order[i + 1]
            url = f"https://maps.googleapis.com/maps/api/directions/json?origin={origin}&destination={destination}&key={API_KEY}"
            futures.append(executor.submit(requests.get, url))

        for future in futures:
            response = future.result()
            data = response.json()
            if data.get("routes"):
                steps = data["routes"][0]["legs"][0]["steps"]
                for step in steps:
                    polyline = step["polyline"]["points"]
                    decoded_polyline = decode(polyline)
                    folium.PolyLine(decoded_polyline, color="red", weight=5).add_to(m)

    save_map(m)

if __name__ == "__main__":
    import sys
    points = sys.argv[1:]  # Prend les arguments de la ligne de commande
    main(points)
