const url = 'https://restcountries.eu/rest/v2/name/';
const countriesList = document.getElementById('countries');
const searchButton = document.getElementById('search');
const countryInput = document.getElementById('country-name');
countryInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        searchButton.click();
    }
})
searchButton.addEventListener('click', searchCountries);

function searchCountries() {
    let countryName = countryInput.value;
    if (!countryName.length) {
        countryName = 'Poland';
    }
    document.getElementById('search-value').innerHTML = `Your search: "${countryName}"`;
    fetch(url + countryName)
        .then((resp) => {
            if (resp.status !== 200) {
                window.alert('Sorry, nothing found');
            } else {
                return resp.json()
                    .then(showCountriesList);
            }
        });
}

function showCountriesList(resp) {
    const template = document.getElementById('table-template').innerHTML;
    countriesList.innerHTML = '';
    resp.forEach(element => {
        let listItem = document.createElement('li');
        let table = Mustache.render(template, element);
        listItem.innerHTML = table;
        countriesList.appendChild(listItem);
    }); 
}