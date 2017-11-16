function initMap() {
	var mw = {lat: 51.272848, lng: -1.103419};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: mw
	});
	var marker = new google.maps.Marker({
		position: mw,
		map: map
	});
};

export default initMap;