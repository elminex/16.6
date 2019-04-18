const url = 'https://restcountries.eu/rest/v2/name/';
const countriesList = document.getElementById('countries');
const searchButton = document.getElementById('search');

searchButton.addEventListener('click', searchCountries);

function searchCountries() {
    let countryName = document.getElementById('country-name').value;
    if (!countryName.length) {
        countryName = 'Poland';
    }
    fetch(url + countryName)
        .then((resp) => {
            if (resp.status !== 200) {
                window.alert('Sorry, nothing found');
            } else {
                return resp.json()
                .then(showCountriesList)
            }
        })
}

function showCountriesList(resp) {
    countriesList.innerHTML = '';
    console.log(resp);
    resp.forEach(element => {
        let listItem = document.createElement('li');
        listItem.innerText = element.name;
        countriesList.appendChild(listItem);
    });
}