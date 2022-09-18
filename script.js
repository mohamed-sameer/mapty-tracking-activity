'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(function (position) {
    const { latitude, longitude } = position.coords
    const coords = [latitude, longitude]
    // leaflet
    map = L.map('map').setView(coords, 13);
    // https://retina-tiles.p.rapidapi.com/local/osm{r}/v1/{z}/{x}/{y}.png
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    map.on('click', function (mapE) {
      // reset the global variable of mapEvent
      mapEvent = mapE
      form.classList.remove('hidden')
      inputDistance.focus()

    })
  }, function () {
    alert('could not get the location')
  })

form.addEventListener('submit', function (e) {
  e.preventDefault()
  //clear form fields
  inputDistance.value = inputDuration.value = inputDuration.value = inputCadence.value = ''

  const { lat, lng } = mapEvent.latlng
  L.marker([lat, lng],).addTo(map)
    .bindPopup(L.popup({
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: 'running-popup'
    }))
    .setPopupContent('workout')
    .openPopup()
})

// change form input type on change
inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
})