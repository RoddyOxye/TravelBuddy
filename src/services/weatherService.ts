// Serviço para ir buscar a meteorologia à API da OpenWeatherMap
export async function obterMeteorologia(latitude: number, longitude: number) {
  const API_KEY = 'd88f7dd0cb22e8f0d70aad620be63e82'; 

  try {
    const resposta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt&appid=${API_KEY}`
    );
    const dados = await resposta.json();

    if (resposta.ok) {
      return {
        temperatura: `${Math.round(dados.main.temp)}°C`,
        vento: `${Math.round(dados.wind.speed * 3.6)} km/h`, // Converte m/s para km/h
        descricao: dados.weather[0].description,
      };
    }
    return null;
  } catch (erro) {
    console.log('Erro ao carregar o tempo:', erro);
    return null;
  }
}