document.addEventListener('DOMContentLoaded', () => {
    countryoption();
    currencyoption();
    detectUserLocation();

    const countrySelect = document.getElementById('country-option');
    if (countrySelect) {
        countrySelect.addEventListener('change', (event) => {
            const selectedCountryName = event.target.options[event.target.selectedIndex].text; // Get the country name
            updateCurrencyByCountry(selectedCountryName);
        });
    }
});


function countryoption() {
    fetch('https://freetestapi.com/api/v1/countries')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Countries API Response:', data);
            const countrySelect = document.getElementById('country-option');

            if (countrySelect && Array.isArray(data)) {
                data.forEach(country => {
                    const option = document.createElement('option');
                    option.value = country.id;  
                    option.text = country.name; 
                    countrySelect.appendChild(option);
                });
            } else {
                console.error('Invalid country data structure or select element not found');
            }
        })
        .catch(error => console.error('Error fetching countries:', error));
}


let currencyData = []; 

function currencyoption() {
    return fetch('https://freetestapi.com/api/v1/currencies')
        .then(response => response.json())
        .then(data => {
            console.log('Currencies API Response:', data); 
            currencyData = data.data || []; 

            console.log('Currency Data:', currencyData); 

            const currencySelect = document.getElementById('currency-option');
            if (currencySelect) {
                
                currencyData.forEach(currency => {
                    const option = document.createElement('option');
                    option.value = currency.code; 
                    option.text = currency.name; 
                    currencySelect.appendChild(option);
                });
            } else {
                console.error('Currency select element not found');
            }
        })
        .catch(error => console.error('Error fetching currencies:', error));
}


function detectUserLocation() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const userIp = data.ip;
            getCountryFromIP(userIp);
        })
        .catch(error => console.error('Error fetching IP:', error));
}

function getCountryFromIP(ip) {
    fetch(`https://ip-api.com/json/${ip}`)  
        .then(response => response.json())
        .then(data => {
            const countrySelect = document.getElementById('country-option');
            const countryName = data.country; 

            console.log('Detected country:', countryName); 
            if (countrySelect && countryName) {
              
                const matchingOption = Array.from(countrySelect.options).find(option => option.text === countryName);
                if (matchingOption) {
                    countrySelect.value = matchingOption.value;
                }
                updateCurrencyByCountry(countryName);  
            } else {
                console.error('Country select element not found or country name is undefined');
            }
        })
        .catch(error => console.error('Error fetching country by IP:', error));
}


function updateCurrencyByCountry(countryName) {
    const currencySelect = document.getElementById('currency-option');
    const matchingCurrency = findCurrencyByCountryName(countryName); 

    if (currencySelect && matchingCurrency) {
        currencySelect.value = matchingCurrency.code;
        console.log(`Currency updated to: ${matchingCurrency.code}`);
    } else {
        console.warn(`No currency found for country: ${countryName}`);
    }
}


function findCurrencyByCountryName(countryName) {
    console.log(`Looking for currency for country: ${countryName}`);

    
    console.log('Currency Data:', currencyData);
    
    
    const matchingCurrency = currencyData.find(currency => 
        currency.countries.includes(countryName)  
    );

    if (!matchingCurrency) {
        console.warn(`No currency found for country: ${countryName}`);
    }

    return matchingCurrency || null;
}

function search() {
    const query = document.getElementById('search-bar-input').value;
    console.log("Searching for:", query);
}




function updatePrices(selectedCurrency, exchangeRate) {
    const priceElements = document.querySelectorAll('.price');  
    priceElements.forEach(priceElement => {
        const originalPrice = parseFloat(priceElement.dataset.originalPrice);  
        const convertedPrice = (originalPrice * exchangeRate).toFixed(2);
        priceElement.textContent = `${convertedPrice} ${selectedCurrency}`;
    });
}


function updatePrices(selectedCurrency, exchangeRate) {
    const priceElements = document.querySelectorAll('.price');  
    priceElements.forEach(priceElement => {
        const originalPrice = parseFloat(priceElement.dataset.originalPrice);  
        const convertedPrice = (originalPrice * exchangeRate).toFixed(2);
        priceElement.textContent = `${convertedPrice} ${selectedCurrency}`;
    });
}
