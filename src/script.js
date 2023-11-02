function toggleDarkMode() {
  const darkMode = document.getElementById('darkMode').checked;
  const body = document.body;

  if (darkMode) {
    body.classList.add('dark'); // Aplica el estilo del modo oscuro.
    body.classList.remove('light'); // Quita el estilo del modo claro.
  } else {
    body.classList.remove('dark'); // Quita el estilo del modo oscuro.
    body.classList.add('light'); // Aplica el estilo del modo claro.
  }
}

// Llama a la función para aplicar el estilo de modo oscuro cuando se carga la página.
toggleDarkMode();

// Agrega un escuchador de eventos para el cambio en el toggle de modo oscuro.
document.getElementById('darkMode').addEventListener('change', toggleDarkMode);

function fetchTimeFromAPI() {
  // URL de la API de WorldTimeAPI para obtener la hora actual basada en tu IP.
  const apiUrl = 'http://worldtimeapi.org/api/ip';

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const timeElement = document.getElementById('time');
      const showSeconds = document.getElementById('showSeconds').checked;
      const format12hr = document.getElementById('format12hr').checked;
      const currentTime = new Date(data.utc_datetime);

      let options = { hour: '2-digit', minute: '2-digit' };
      if (showSeconds) {
        options.second = '2-digit';
      }

      // Comprueba el formato de la hora y establece las opciones correspondientes.
      if (format12hr) {
        options.hour12 = true;
      } else {
        options.hour12 = false;
      }

      let formattedTime = currentTime.toLocaleTimeString([], options);

      // Si el formato de 12 horas está habilitado, elimina las letras "a.m." y "p.m.".
      if (format12hr) {
        formattedTime = formattedTime.toUpperCase().replace(/\s/g, '').replace(/A.M./g, '').replace(/P.M./g, '');
      }

      timeElement.textContent = formattedTime;
    })
    .catch((error) => {
      console.error('Error al obtener la hora desde la API:', error);
    });
}

// Actualiza la hora cada segundo.
setInterval(fetchTimeFromAPI, 1000);

// Llama a la función para obtener la hora cuando se carga la página.
fetchTimeFromAPI();
