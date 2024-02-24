// eslint-disable
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoibWludGh1YW4xNDI1IiwiYSI6ImNsc3p0djNoNjAzMmoybHJ6NndxMmQ4MnUifQ.l0oTngwozXkqFOdLTKJxTA';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/minthuan1425/clsztw2ur005m01pj5csj0dtt', // style URL
  scrollZoom: false,
  //   center: [-118.113491, 34.111745], // vị trí trung tâm sẽ xuất hiện
  //   zoom: 10, // phóng to lên
  //   interactive: false, // cố định một vị trí không thể di chuyển
});

const bounds = new mapboxgl.LngLatBounds();
locations.forEach((loc) => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // add popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);
  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
