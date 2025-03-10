const countryNameInput = document.querySelector("#country-name");
const countryInfoSection = document.querySelector("#country-info");
const borderingCountriesSection = document.querySelector("#bordering-countries");
const submitBtn = document.querySelector("#submit-btn");

submitBtn.addEventListener("click", async() => {
    const country = countryNameInput.value;
    const url = "https://restcountries.com/v3.1/name/"

    const result = await fetch(`${url}${country}`);
    const data = await result.json();
    const {capital, population, region, flags, borders} = data[0];
    const cleanedData = {capital: capital[0], population: population.toLocaleString(), region, flag: flags.png};
    const borderingCountries = [];

    for(let i = 0; i < borders.length; i++) {
        const borderResult = await fetch(`https://restcountries.com/v3.1/alpha/${borders[i]}`);
        const borderData = await borderResult.json();
        const {name, flags} = borderData[0];
        const cleanedBorderData = {name: name.common, flag: flags.png}
        borderingCountries.push(cleanedBorderData);
    }

    const fieldsOfInterest = ["Capital", "Population", "Region", "Flag", "Borders"];

    fieldsOfInterest.forEach(field => {
        if(field === "Flag") {
            const element = document.createElement("p");
            element.textContent = `${field}:`
            countryInfoSection.appendChild(element);

            const img = document.createElement("img");
            img.src = cleanedData.flag
            countryInfoSection.appendChild(img);
        }else if(field === "Borders") {
            const element = document.createElement("p");
            element.textContent = `Bordering Countries:`
            countryInfoSection.appendChild(element);

            borderingCountries.forEach(borderingCountry => {
                const borderingCountryName = document.createElement("p");
                borderingCountryName.textContent = `${borderingCountry.name}:`
                borderingCountriesSection.appendChild(borderingCountryName);

                const borderingCountryImg = document.createElement("img");
                borderingCountryImg.src = borderingCountry.flag;
                borderingCountriesSection.appendChild(borderingCountryImg);
            })
        }else {
            const element = document.createElement("p");
            element.textContent = `${field}: ${cleanedData[field.toLowerCase()]}`
            countryInfoSection.appendChild(element);
        }
   
    })
})