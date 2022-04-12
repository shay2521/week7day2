//  API KEY https://home.openweathermap.org/api_keys
const API_KEY = ''
const card = document.getElementById('card');           //  Grabs bootstrap card from index.html

/**
 * @param city 
 * @param zipcode 
 * @returns data 
 * city and zip code input to JSON data file 
 */
const getAPIData = async (city, zipcode=null) => {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&q=${city}&appid=${API_KEY}&units=imperial`);
    let data = await response.json();
    return await data;
}

/**
 * @param data 
 * @param city 
 * JSON data file to prints out formatted data
 */
const displayData = async (data, city) => {
    data = await data;

    //  html elements everything
    let img = document.getElementById('card-img');
    let li1 = document.getElementById('li-1');
    let li2 = document.getElementById('li-2');
    let li3 = document.getElementById('li-3');
    let li4 = document.getElementById('li-4');

    //  addes to main text
    document.getElementById('card-title').innerText = await city.charAt(0).toUpperCase() + city.substr(1, city.length-1);
    img.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
    document.getElementById('card-temp').innerText = parseInt(data.main.temp) + '\u2109';
    document.getElementById('card-text').innerHTML = `<em>Feels like: ${parseInt(data.main.feels_like)}\u2109</em>`;

    //  addes elements in card
    li1.innerHTML = `<strong>High:</strong> ${parseInt(data.main.temp_max)}\u2109`
    li2.innerHTML = `<strong>Low:</strong> ${parseInt(data.main.temp_min)}\u2109`
    li3.innerHTML = `<strong>Pressure:</strong> ${parseInt(data.main.pressure)} psia`
    li4.innerHTML = `<strong>Low:</strong> ${parseInt(data.main.humidity)}\u2109`

}

/**
 * input to data funciton
 */
const weatherForm = document.getElementById('weatherForm');
weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let city = e.target.city.value;
    let zipcode = e.target.zipcode.value;

    let data = await getAPIData(city, zipcode);
    card.style.visibility = 'visible';
    await displayData(data, city);
});