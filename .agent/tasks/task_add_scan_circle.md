---
description: Add a scanning circle to the map center and restrict data fetching to its radius.
---
# Implementation of Circular Scanning Area

1.  **Added Scanning Circle**:
    -   Implemented a `L.circle` with a radius of 300 meters.
    -   Styled with neon green color and dashed lines to fit the "high-tech" theme.
    -   Attached an event listener to the map's `move` event to keep the circle centered in the viewport.

2.  **Updated Data Fetching**:
    -   Modified `fetchBuildings` to accept `center` coordinates and `radius` instead of a bounding box.
    -   Updated the Overpass API query to use the `(around:{radius},{lat},{lon})` filter. This restricts the data retrieval to building ways and relations within the specified radius of the circle's center.

3.  **Updated Button Logic**:
    -   Updated the "SCAN AREA" button click handler to get the current map center and pass it to the updated `fetchBuildings` function.

This implementation ensures that users can visually identify the scanning area and only receive data relevant to that specific circular region.
