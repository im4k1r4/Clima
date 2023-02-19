document.querySelector('.busca').addEventListener('submit', async (event) => { // chamar fn depois do submit
    event.preventDefault(); // prevenir o comportamento padrão, ou seja enviar

    let input = document.querySelector('#searchInput').value; // pegar o que o user digitou

    if(input !== '') { // se a procura for diferente de vazio
        showWarning('Carregando...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=430872917b92f6f341cb7abeea0b9fe6&units=metric&lang=pt_br`; // encode substitui alguns caracteres como espaço

        let results = await fetch(url); // faz a requisição mas espera o resultado
        let json = await results.json(); // pega o resultado aguarda e transforma em json

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });

        } else {
            clearInfo();
            showWarning('Não encontramos essa localização.')
        }
    } else {
        clearInfo();
    }

});

// Funções:
function showInfo(json) { // Função que habilita os resultados recebendo o json
    showWarning(''); // remove o aviso de carregando

    //começar a preencher o resultado:
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg; // Exibir mensagem de carregando
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}