// Contains a function to get the coordinates [lon, lat] of the property:
require("dotenv").config();
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapBoxToken });

const getGeoCoordinates = async (location, country) => {
    let response = await geocodingClient.forwardGeocode({
        query: `${location}, ${country}`,
        limit: 1
    }).send();
    
    return response.body.features[0].geometry;
}

module.exports = getGeoCoordinates;