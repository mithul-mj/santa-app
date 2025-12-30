---
description: Add a location search bar to the application.
---
# Implementation of Location Search

1.  **Added Search UI**:
    -   Modified `index.html` to include a search container with an input (Id: `search-input`) and a magnifying glass button (Id: `search-btn`).
    -   Styled the search bar in `style.css` to match the application's glassmorphism aesthetic (blurry background, rounded borders).

2.  **Implemented Search Logic**:
    -   Added event listeners for:
        -   Clicking the search button.
        -   Pressing 'Enter' in the search input.
    -   Used the **Nominatim OpenStreetMap API** to geocode the user's query (`https://nominatim.openstreetmap.org/search`).
    -   On successful result:
        -   The map automatically pans to the new location (`map.setView`).
        -   The scanning circle updates its position (handled by existing `move` listener).
        -   The user can immediately click "SCAN AREA" to find buildings in the new location.

verified with search for "Mysore Palace".
