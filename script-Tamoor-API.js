
document.addEventListener('DOMContentLoaded', () => {
    countryoption();
    currencyoption();
    detectUserLocation();
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

            
            if (data && Array.isArray(data)) {
                data.forEach(country => {
                    const option = document.createElement('option');
                    option.value = country.id;  
                    option.text = country.name;  
                    countrySelect.appendChild(option);
                });
            } else {
                console.error('Invalid country data structure:', data);
            }
        })
        .catch(error => console.error('Error fetching countries:', error));
}


function currencyoption() {
    fetch('https://freetestapi.com/api/v1/currencies')
        .then(response => response.json())
        .then(data => {
            const currencySelect = document.getElementById('currency-option');
            data.data.forEach(currency => {
                const option = document.createElement('option');
                option.value = currency.iso;
                option.text = currency.name;
                currencySelect.appendChild(option);
            });
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
    fetch(`http://ip-api.com/json/${ip}`)
        .then(response => response.json())
        .then(data => {
            const countrySelect = document.getElementById('country-option');
            const currencySelect = document.getElementById('currency-option');
            countrySelect.value = data.countryCode; 
            currencySelect.value = data.currency;   
        })
        .catch(error => console.error('Error fetching country by IP:', error));
}

function search() {
    const query = document.getElementById('search-bar-input').value;
    console.log("Searching for:", query);
    
}



































