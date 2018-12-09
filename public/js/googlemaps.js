function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(34, -84),
    zoom: 9,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  const infoWindow = new google.maps.InfoWindow();

  fetch('/read-json').then(res => res.json())
    .then(records => {
    
      let markers = records.map(rec => {
        const latLng = new google.maps.LatLng(rec.lat, rec.lng);

        // Creating a marker and putting it on the map
        const marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: rec.title,
          zip: rec.zip
        });

        google.maps.event.addListener(marker, "click", function(e) {
          infoWindow.setContent(rec.description);
          infoWindow.open(map, marker);
        });
        return marker;
      }); 

      const markersCopy = markers;
      
      document.querySelector('#pac-input').addEventListener('input', (e) => {
        const zipCode = e.target.value;
        markers.forEach(m => m.setVisible(false))
        if (zipCode && !isNaN(zipCode)) {
          markers = markersCopy.filter(m => m.zip.includes(zipCode));
          markers.forEach(m => m.setVisible(true))
        } else if (zipCode){
          markers.forEach(m => m.setVisible(false))
        } else {
          markersCopy.forEach(m => m.setVisible(true))
        }
      });
    })
    .catch(err => console.log('error loading Map Data', err))
}