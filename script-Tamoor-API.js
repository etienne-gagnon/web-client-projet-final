fetch('https://api.ipify.org?format=json')
.then(response=> response.json())
.then(data=> {
    let country = data.country;
    let currency = data.currency;
    document.get

}