# 🧭 Why Google Maps is More Accurate?

You asked why Google Maps shows direction perfectly while browser apps can struggle. Here is the technical breakdown:

## 1. Sensor Fusion (The Secret Sauce)
Google Maps doesn't just use the **Compass** (magnetometer). It combines data from **three** sensors:
*   **Magnetometer**: Finds Magnetic North.
*   **Gyroscope**: Detects rotation speed (very smooth, no jitter).
*   **Accelerometer**: Detects gravity/tilt.
*   **GPS**: When you are moving, Google ignores the compass and uses your GPS path to determine direction.

This combination allows Google to filter out "magnetic noise" (like interference from a laptop or metal table). Browser-based apps (`deviceorientation`) mostly rely on the raw Compass signal, which is noisier.

## 2. Magnetic Declination
Google Maps automatically calculates the difference between **Magnetic North** (where the compass points) and **True North** (the North Pole). This varies by city (Bengaluru is different from New York). Browser visuals often point to Magnetic North unless the device OS compensates for it.

## 3. How to Improve Your Compass
Since this is a web application utilizing the device's hardware sensors, you can improve accuracy significantly by **calibrating**:

1.  **Figure-8 Motion**: Wave your phone in a Figure-8 pattern in the air. This resets the magnetometer.
2.  **Avoid Interference**: Tests on a table near a **laptop**, **monitor**, or **speakers** will distort the magnet. Move away from electronics.
3.  **GPS Movement**: Begin walking/driving. Once you move, navigation logic becomes 100% accurate because it uses satellites instead of magnets.
