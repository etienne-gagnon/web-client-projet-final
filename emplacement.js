function emplacement() {
    // écouteur pour si le pays change
    document.addEventListener('DOMContentLoaded', () => {
        countryOption();
        currencyOption();
        detectUserLocation();

        const countrySelect = document.getElementById('country-option');
        const currencySelect = document.getElementById('currency-option');

        if (countrySelect || currencySelect) {
            countrySelect.addEventListener('change', (event) => {
                const selectedCountryName = event.target.options[event.target.selectedIndex].text; // Get the country name
                updateCurrencyByCountry(selectedCountryName);

            });
        }

    });

    // Récupération du pays avec l'API
    function countryOption() {
        fetch('https://freetestapi.com/api/v1/countries')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })

            .then(data => {
                //console.log('Countries API Response:', data);
                const countrySelect = document.getElementById('country-option');
                if (countrySelect && Array.isArray(data)) {
                    data.forEach(country => {
                        let countryName = country.name;

                        const option = document.createElement('option');
                        option.value = country.id;
                        option.text = countryName.substring(0, 15);
                        countrySelect.appendChild(option);

                    });

                } else {
                    console.error('Invalid country data structure or select element not found');
                }
            })
            .catch(error => console.error('Error fetching countries:', error));
    }


    let currencyData = [];

    // Récupération de la monnaie avec l'API
    function currencyOption() {
        return fetch('https://freetestapi.com/api/v1/currencies')
            .then(response => response.json())
            .then(data => {

                //console.log(data)
                //console.log('Currencies API Response:', data); 
                currencyData = data;

                //console.log('Currency Data:', currencyData); 

                const currencySelect = document.getElementById('currency-option');
                if (currencySelect) {

                    currencyData.forEach(currency => {
                        const option = document.createElement('option');
                        option.value = currency.code;
                        option.text = currency.code;
                        currencySelect.appendChild(option);
                    });
                } else {
                    console.error('Currency select element not found');
                }
            })
            .catch(error => console.error('Error fetching currencies:', error));
    }

    // Récupération de l'adresse ip avec l'API
    function detectUserLocation() {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const userIp = data.ip;
                getCountryFromIP(userIp);
            })
            .catch(error => console.error('Error fetching IP:', error));
    }

    // Récupération du pays en fonction de l'adresse ip avec l'API
    function getCountryFromIP(ip) {
        fetch(`https://ipapi.co/${ip}/json/`)
            .then(response => response.json())
            .then(data => {
                const countrySelect = document.getElementById('country-option');
                const countryName = data.country_name;


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

    // Update la currency
    function updateCurrencyByCountry(countryName) {
        const currencySelect = document.getElementById('currency-option');
        const matchingCurrency = findCurrencyByCountryName(countryName);

        if (currencySelect && matchingCurrency) {
            currencySelect.value = matchingCurrency.code;

            console.log(currentCurrencyTaux);
            currentCurrencyTaux = matchingCurrency.exchange_rate;
            currentCurrencySymbol = matchingCurrency.symbol;

            let currentPage = main.className;
            changeView("accueil-view");
            changeView(currentPage);
            //console.log(`Currency updated to: ${matchingCurrency.code}`);

        } else {
            console.warn(`No currency found for country: ${countryName}`);
        }
    }


    function findCurrencyByCountryName(countryName) {
        //console.log(`Looking for currency for country: ${countryName}`);
        //console.log('Currency Data:', currencyData);

        const matchingCurrency = currencyData.find(currency =>
            currency.countries.includes(countryName)
        );

        if (!matchingCurrency) {
            console.warn(`No currency found for country: ${countryName}`);
        }

        return matchingCurrency || null;
    }
}