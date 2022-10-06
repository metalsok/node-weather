console.log('Hello World');

const form = document.forms[0];
const locationName = document.getElementById('location');
const forecast = document.getElementById('forecast');

form.addEventListener('submit', (e) => {
      e.preventDefault();
      const city = document.getElementById('city').value;
      if (!city) {
        forecast.innerText = 'Please insert a valid location!';
        return;
      }
      fetch(`/weather?city=${city}`).then(((response) => {
        if (response) {
          return response.json().then((data) => {
            locationName.innerText = data.location;
            forecast.innerText = data.forecast;
          });
        }
      }));
    },
);
