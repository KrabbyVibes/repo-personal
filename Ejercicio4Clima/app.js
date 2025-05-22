// Clima por ubicación automática
function obtenerClimaLocal() {
    //Consigo la ubicacion del local weather
    const localDiv = document.getElementById('localWeather');
    localDiv.innerHTML = 'Detectando ubicación...';

    // consigo la posicion
    navigator.geolocation.getCurrentPosition(
        //Caso de exito
        async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            //Inicio try para capturar errores 
            try {
            //Consigo el clima de open-meteo
            const weatherRes = await axios.get('https://api.open-meteo.com/v1/forecast', {
                params: {
                latitude: lat,
                longitude: lon,
                current_weather: true
                }
            });
            //Extraigo los datos que consegui del clima actual
            const weather = weatherRes.data.current_weather;
            //Pongo esos datos en el html para mostrarlos
            localDiv.innerHTML = `
                <h2>📍 Clima actual en tu ubicación</h2>
                <p>🌡️ Temperatura: ${weather.temperature} °C</p>
                <p>💨 Viento: ${weather.windspeed} km/h</p>
                <p>🧭 Dirección del viento: ${weather.winddirection}°</p>
            `;
            //Caso de falla del try
            } catch (err) {
                localDiv.innerHTML = 'No se pudo obtener el clima local.';
            }
        },
        //Caso de falla del geolocation
        (error) => {
            localDiv.innerHTML = 'Permiso de ubicación denegado o no disponible.';
        }
    );
}

// Llamamos a la función al cargar la página
obtenerClimaLocal();


//Funcion que se ejecuta cuando escribo una ciudad
document.getElementById('weatherForm').addEventListener('submit', async function(e) {
    //Evito que quede vacio
    e.preventDefault();
    //Consigo la ciudad escrita y donde ira el resultado
    const city = document.getElementById('cityInput').value.trim();
    const resultDiv = document.getElementById('result');

    resultDiv.innerHTML = 'Buscando...';
    //Seguridad por si no hay ciudad (creo que quedo obsoleto, revisar)
    if (!city) {
    resultDiv.innerHTML = 'Por favor ingresa una ciudad válida.';
    return;
    }

    try {
        // Obtener coordenadas de la ciudad usando nominatim
        const geoResponse = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
            q: city,
            format: 'json',
            limit: 1
            }
        });

        if (geoResponse.data.length === 0) {
            //Throw detiene la ejecucion y envia el error al "catch"
            throw new Error('Ciudad no encontrada');
        }

        const geoData = geoResponse.data[0];
        //si no devuelve una posicion decimos que no existe
        if (!geoData || !geoData.lat || !geoData.lon) {
            throw new Error('Ciudad no encontrada o inválida.');
        }
        //Si existe los guardo
        const { lat, lon, display_name } = geoResponse.data[0];

        // Obtener datos meteorológicos de Open-Meteo
        const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
            params: {
            latitude: lat,
            longitude: lon,
            current_weather: true
            }
        });

        const data = weatherResponse.data;
        //Agrego los datos al html para mostrarlos
        resultDiv.innerHTML = `
            <h2>${display_name}</h2>
            <p>🌡️ Temperatura: ${data.current_weather.temperature} °C</p>
            <p>💨 Viento: ${data.current_weather.windspeed} km/h</p>
            <p>🧭 Dirección del viento: ${data.current_weather.winddirection}°</p>
        `;
        //Manejo de errores
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});