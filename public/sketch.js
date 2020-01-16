//geo locate
let lat, lon, weather, air;
if ('geolocation' in navigator) {
console.log('geolocation available');
navigator.geolocation.getCurrentPosition(async position => {

    try{
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    document.getElementById('latitude').textContent = lat.toFixed(2);
    document.getElementById('longitude').textContent = lon.toFixed(2);

    const api_url = `/weather/${lat},${lon}`;
    const response = await fetch(api_url);
    const json = await response.json();
    console.log(json);
    weather = json.weather.currently;
    air = json.air_quality.results[0].measurements[0];

    document.getElementById('summary').textContent = weather.summary;
    document.getElementById('temperature').textContent = weather.temperature;
    document.getElementById('aq_parameter').textContent = air.parameter;
    document.getElementById('aq_value').textContent = air.value;
    document.getElementById('aq_units').textContent = air.unit;
    document.getElementById('aq_date').textContent = air.lastUpdated;

    }catch(err){
        air = {value:-1};
        if(err instanceof TypeError){
            document.getElementById('summary').textContent = weather.summary;
            document.getElementById('temperature').textContent = weather.temperature;
            document.getElementById('tempPara').textContent = 'No Data Found in openAQ API for this Location!!'
            document.getElementById('tempPara').style.color = 'rgb(255, 77, 77)';
            document.getElementById('tempPara').style.textDecoration = 'underline';
            console.error('TypeError Occurs !!!!!!');
        } else{
            throw err;
        }
    };
    

});
} else {
console.log('geolocation not available');
}


//handle button processes, submit data to databse
const button = document.getElementById('submit');
button.addEventListener('click', async event => {
const data = {lat, lon, weather, air};
const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
};
const response = await fetch('/api', options);
const json = await response.json();
console.log(json);
});

