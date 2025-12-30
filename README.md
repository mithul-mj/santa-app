# 🎅 Santa Terrace Navigator

**Mission Objective:** A tactical, high-tech gift delivery system designed for Santa's modern operations. Utilizing satellite imagery and LIDAR data, this application identifies optimal landing zones (flat concrete terraces) and generates efficient flight paths for package delivery.

![App Screenshot](./assets/flightPath.jpeg)

## 🚀 Features

*   **📡 LIDAR Sector Scan**: Scans the current map area for buildings suitable for sleigh landing (Flat roofs > 3 floors).
*   **🎯 Path Locking**: Automatically generates a "Visiting Salesman" style route to minimize flight time between houses.
*   **🎒 Cargo Management**: Inventory system to track gifts (Lego Sets, PS5s, Teddy Bears).
*   **🎡 Gift Randomizer**: A physics-based spin wheel to decide which gift to deliver to uncertain targets.
*   **🧭 Tactical HUD**: Compass, weather data (Open-Meteo), and distance tracking.
*   **📱 3D Mobile Experience**: Fully responsive landing page with 3D interactions.

## 🛠️ Tech Stack

*   **Core**: Vanilla JavaScript (ES Module structure).
*   **Maps**: [Leaflet.js](https://leafletjs.com/) with CartoCDN Dark Matter tiles.
*   **Data APIs**:
    *   [Overpass API](https://overpass-api.de/) (OpenStreetMap data for building footprints).
    *   [Open-Meteo](https://open-meteo.com/) (Real-time weather).
    *   [Nominatim](https://nominatim.org/) (Location search).
*   **Build Tool**: [Vite](https://vitejs.dev/).
*   **Styling**: Native CSS3 with Glassmorphism and 3D Transforms.

## 📦 Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/mithul-mj/santa-app.git
    cd santa-app
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Initialize Mission Control (Run Locally):
    ```bash
    npm run dev
    ```

4.  Deploy:
    ```bash
    npm run build
    ```

## 🎮 How to Play

1.  **Initialize System**: Click the button on the landing page.
2.  **Scan**: Click "SCAN SECTOR" to find houses in Bengaluru (or search for a new city).
3.  **Route**: Click a blue building to start a route. A green line will connect targets.
4.  **Deliver**: Click "Give Gift" on each house marker.
5.  **Spin**: If you are undecided, spin the wheel to pick a gift!

---
*Built for the North Pole Engineering Team (NPET).*
