// API Key
const key = "h3YaNzNKJ5W0HQma1coeDdTn00n9CAcy"

//Get weather information
const getWeather = async (locationId) => {

    const base = "https://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${locationId}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

};


//Get city info
const getCity = async (city) => {

const base = "https://dataservice.accuweather.com/locations/v1/cities/search"
const query = `?apikey=${key}&q=${city}`;

const response = await fetch(base + query);
const data = await response.json();

return data[0];

};



// getCity("woodbridge").then(data => {
//     return getWeather(data.Key);
// }).then(data => {
//     console.log(data);
// })
// .catch(err => console.log(err));

