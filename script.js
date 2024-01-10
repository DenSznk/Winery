window.onload = function() {
    loadWine();
    document.getElementById('country').addEventListener('change', filterByCountry);
};

let allWines = [];

function loadWine() {
    fetch('test_data.json')
    .then(response => response.json())
    .then(data => {
        allWines = data;
        getCountries(data);
        displayItems(data);
    })
    .catch(error => console.error('Error loading data: ', error))
}


function getCountries(data) {
    let countrySet = new Set();
    data.forEach(item => {
        const country = item.location.split('\n')[0];
        if (country !== '') {
            countrySet.add(country);
        }
    });

    let countrySelect = document.getElementById('country');
    countrySet.forEach(country => {
        let option = document.createElement('option');
        option.textContent = country;
        option.value = country;
        countrySelect.appendChild(option);
    })
}

function displayItems(data) {
    let itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = '';
    data.forEach(item => {
        let itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.wine}">
            <div class="winery">${item.winery}</div>
            <div class="wine">${item.wine}</div>
            <div class="rating">Average Rating: ${item.rating.average} (${item.rating.reviews})</div>
            <div class="location">${item.location.replace('\n·\n', ', ')}</div>
        `;
        itemsContainer.appendChild(itemDiv);
    });
}

function filterByCountry() {
    let selectedCountry = document.getElementById('country').value;
    let filteredWines = allWines.filter(item =>
        selectedCountry === 'All' || item.location.includes(selectedCountry)
    );
    displayItems(filteredWines);
}

