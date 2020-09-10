const cityForm = document.querySelector('form');
const card = document.querySelector(".card");
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    console.log(data);
    const cityDetails = data.cityDetails;
    const weather = data.weather;

    //Destructure properties that are on the line above
    //const { cityDetails, weather } = data;


    //Update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName + "," + " " + cityDetails.AdministrativeArea.EnglishName + '<br>' + '<br>' + cityDetails.Country.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Imperial.Value}</span>
            <span>&deg;F</span>
        </div>
    `;

    //Update the night/day & icon images
    const iconSrc = `icons/${weather.WeatherIcon}.svg`
        icon.setAttribute('src', iconSrc)

    //Ternary operator example fot the lines below it 
    // let timeSrc = weather.IsDayTime ? 'icons/day.svg' : 'icons/night.svg';
    //time.setAttribute('src', timeSrc)

    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'icons/day.svg';
    }else{
        timeSrc = 'icons/night.svg';
    }
    time.setAttribute('src', timeSrc)

    //Remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}

const updateCity = async (city) => {

    const cityDetails = await getCity(city); 
    const weather = await getWeather(cityDetails.Key);

    return {
        cityDetails: cityDetails,
        weather: weather
    };

};

cityForm.addEventListener('submit', e => {
    //Prevent default action
    e.preventDefault();

    //Get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //Update the UI with the new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    //Set local storage
    localStorage.setItem('city', city);

});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}