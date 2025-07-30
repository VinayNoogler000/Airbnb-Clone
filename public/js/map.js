document.addEventListener("DOMContentLoaded", () => {
    mapboxgl.accessToken = mapBoxToken;
    const coordinates = listing.geometry.coordinates;

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: coordinates.length > 0 ? coordinates : [77.2088, 28.6139], // starting position [lng, lat]. Default coordinates are of New Delhi
        zoom: 9, // starting zoom
    });

    // Add Map Navigiation Controls:
    map.addControl(new mapboxgl.NavigationControl());

    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker({color: "red"})
        .setLngLat(coordinates.length > 0 ? coordinates : [77.2088, 28.6139])
        .setPopup(new mapboxgl.Popup({offset: 25})
        .setHTML(`<h3>${listing.title}</h3><p>Exact Location will be provided after booking!</p>`)) // add popup
        .addTo(map);
});