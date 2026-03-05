const form = document.querySelector('#search-form > form');
const input = document.querySelector('#input-location');
const sectionWeatherInfos = document.querySelector('#weather-info');
// No typescript, o "?" serve para realizar uma verificação, que no exemplo abaixo, é saber se o form é um elemento ou não.
form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    // Se a condição for verdadeira, o return sai da função
    if (!input || !sectionWeatherInfos)
        return;
    const location = input.value;
    if (location.length < 2) {
        alert('O local precisa ter, pelo menos, 2 letras');
        return;
    }
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=4dc04e0a5cfc2891b20d092507ec8914&lang=pt_br&units=metric`);
        const finalData = await response.json();
        const infos = {
            temperature: Math.round(finalData.main.temp),
            local: finalData.name,
            icon: `https://openweathermap.org/img/wn/${finalData.weather[0].icon}@2x.png`
        };
        console.log(finalData);
        sectionWeatherInfos.innerHTML = `
            <div class = "weather-data">
                <h2>${infos.local}</h2>
                <span>${infos.temperature}</span>
            </div>
            <img src="${infos.icon}"/>
        `;
    }
    catch (err) {
        console.log('Deu um erro na obtenção dos dados da API', err);
    }
});
export {};
//# sourceMappingURL=index.js.map