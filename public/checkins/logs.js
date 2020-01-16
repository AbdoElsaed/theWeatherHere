// Setting a higher initial zoom to make effect more obvious
const mymap = L.map('checkinMap').setView([0, 0], 1);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);



getData();
async function getData(){   
    let response = await fetch('/api');
    let data = await response.json();

    for(item of data){

        const marker = L.marker([item.lat, item.lon]).addTo(mymap);

        let txt = `The weather here at ${item.lat}, ${item.lon} is ${item.weather.summary} with a temperature of ${item.weather.temperature}° C.`;
        
        // if(item.air.value < 0 ){
        //     txt+='*no air data found*';
        // } else{
        //     txt+=`The Concentration of particular matter (${item.air.parameter}) is ${item.air.value}${item.air.unit}, last read on ${item.air.lastUpdated}`;
        // };

        marker.bindPopup(txt);

  
     }

    console.log(data);
}



  //     //creating elements
    //     let root = document.createElement('div');
    //     let geo = document.createElement('div');
    //     let date = document.createElement('div');

    //     //styles
    //     root.style.backgroundColor = "#EEE";
    //     root.style.marginBottom = "20px";
    //     root.style.marginTop = "20px";
    //     root.style.width = "800px";
    //     root.style.padding = "20px";

    //     //text content
    //     geo.textContent = `* Latitude: ${item.lat}° , Longitude: ${item.lon}°`;
    //     let dateString = new Date(item.timestamp).toLocaleString();
    //     date.textContent = `* ${dateString}`;

    //     root.append(geo, date);
    //     document.body.append(root);