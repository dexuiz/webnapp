
$('.icon.sidebar').click(()=>{
  $('.ui.sidebar').sidebar('toggle');
});

$("#sinput").on("keyup",function(e){
  if (e.keyCode == 13) {
    $("form").submit();
  }
})


var map = L.map('mapid').setView([19.0356,73.0228],12)

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken:'pk.eyJ1IjoiZGV4dWl6IiwiYSI6ImNqOGh0dDFrMzBzbDgycXBiN2czdXI3MXAifQ.BtaT7PDh-ZgDGv_Dp8TivA'
}).addTo(map);

const myCustomColour = 'green'

const markerHtmlStyles = `
  background-color: ${myCustomColour};
  width: 3rem;
  height: 3rem;
  display: block;
  left: -1.5rem;
  top: -1.5rem;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`

const myIcon = L.divIcon({
  className: "my-custom-pin",
  iconAnchor: [0, 24],
  labelAnchor: [-6, 0],
  popupAnchor: [0, -36],
  html: `<span style="${markerHtmlStyles}" />`
})

var marker = L.marker([51.5, -0.09],{icon:myIcon}).addTo(map);

	
fetch('/home/json').then((response)=>{
  if (response.status!==200) {
    console.log(reponse.statusText);
    console.log("there was an error");
  }else {
    response.json().then(function(data){
    	console.log(data)
		$("#limit").text(data.limit)
		$("#to").text(data.to)
		latlng= data.to_lat.split(",")
		var lat=latlng[0]
		var long =latlng[1]
		to_lat  = parseFloat(lat)
		to_long = parseFloat(long)
		if(data.hasOwnProperty("from")){
			var fromlatlng= data.from_lat.split(",")
			var fromlat  = parseFloat(fromlatlng[0])
			var fromlong = parseFloat(fromlatlng[1])
			$("#from").text(data.from)
			L.Routing.control({
    			waypoints: [
        		L.latLng(fromlat, fromlong),
        		L.latLng(to_lat, to_long)
    			]
			}).addTo(map);
			marker.setLatLng([fromlat,fromlong]).update()
		}else
		{
			if(data.hasOwnProperty("gps")){
				fromlat= data.gps[0]
				fromlong=data.gps[1]
				var geocoder = new google.maps.Geocoder;
				var latlng ={lat:fromlat,lng:fromlong}
				geocoder.geocode({'location': latlng}, function(results, status) {
					if(status==='OK'){
						$("#from").text(results[0].formatted_address)
						L.Routing.control({
    						waypoints: [
        					L.latLng(fromlat, fromlong),
        					L.latLng(to_lat, to_long)
    						]
						}).addTo(map);
						marker.setLatLng([fromlat,fromlong]).update()

					}else
					{
						console.log("net error ")
					}

				})

			}
		}
    })
  }
})


var socket = io();
socket.emit("works","hopeThisWorksMan")

socket.on("success",function(data){
  console.log(data)
})

//$('.ui.basic.modal')
  // .modal('show')


socket.on("data",function(data){
	console.log(data)
	if(data["speed"]>parseInt($("#limit").html())){
		$("#speed").addClass("red")
	}
   	$("#speed").text(data["speed"])
   	marker.setLatLng([data["lat"],data["long"]]).update()
   	if(data["offense"]!="safe"){
   		$("#warn").text("you were caught "+data["offense"]+". Your actions are being monitored and appropriate action will be taken")
   		$('.ui.basic.modal').modal('show')

   	}
})

// socket.on("point",function(data){
//   console.log("new data from python ",data);
//   var marker = L.marker([data.coords.lat,data.coords.lng]).addTo(map);
//   marker.bindPopup("<b>licenseplate:</b>"+data.liplate+"<br>"+"<b>Offense type:</b>"+data.offense_type+'<a href="/inf/'+ data._id +'">go to page</a>')
//   markers.addLayer(marker)
//   // connects[data.id]=data;
// })

// var markers = L.markerClusterGroup();

// function setMarker(data){
//     if(data.coords){
//       console.log("setmarker invoked");
//       var marker = L.marker([data.coords.lat,data.coords.lng]).addTo(map);
//       marker.bindPopup("<b>licenseplate:</b>"+data.liplate+"<br>"+"<b>Offense type:</b>"+data.offense_type+'<a href="/inf/'+ data._id +'">go to page</a>')
//       markers.addLayer(marker)
//     }
//       // map.addLayer(markers)

// }

