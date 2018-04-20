import axios from 'axios'
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}


export const apiUrl = 'http://localhost:3600/api';
export const londonUrl = 'http://159.65.60.122:3600/api';
export const frankfurtUrl = 'http://206.189.58.237:3600/api';
export const getApiUrl = async() => {
    let serverLocations = {
        "london": {
            url: "159.65.60.122",
            location: null
        },
        "frankfurt": {
            url: "206.189.58.237",
            location: null
        },
    }
    let clientloc=null;
    await axios.get("https://ipinfo.io?token=68fcc23490f525")  //client
        .then(response => {
            clientloc = response["data"]["loc"];
        })
    await axios.get("https://ipinfo.io/206.189.58.237?token=68fcc23490f525") // frankfurt
        .then(response => {
            serverLocations["frankfurt"].location = response["data"]["loc"];
        })
    await axios.get("https://ipinfo.io/159.65.60.122?token=68fcc23490f525")  //londom
        .then(response => {
            serverLocations["london"].location = response["data"]["loc"];
        })
        
        let clientToLondon = getDistanceFromLatLonInKm(parseFloat(clientloc.split(",")[0]),parseFloat(clientloc.split(",")[1]),
        parseFloat(serverLocations["london"].location.split(",")[0]),parseFloat(serverLocations["london"].location.split(",")[1]));
       
        let clientToFrankfurt = getDistanceFromLatLonInKm(parseFloat(clientloc.split(",")[0]),parseFloat(clientloc.split(",")[1]),
        parseFloat(serverLocations["frankfurt"].location.split(",")[0]),parseFloat(serverLocations["frankfurt"].location.split(",")[1]));
        
        if(clientToFrankfurt< clientToLondon) {
            return `http://${serverLocations["frankfurt"].url}:3600/api`
        } else {
            return `http://${serverLocations["london"].url}:3600/api`
        }

}

