//OBSŁUGA ZDARZEŃ OBSŁUGA ZDARZEŃ OBSŁUGA ZDARZEŃ OBSŁUGA ZDARZEŃ OBSŁUGA ZDARZEŃ OBSŁUGA ZDARZEŃ
/*
var mouseCnt = 0,
    mouseX = 0,
    mouseY = 0,
    mouseTag = "";
function mouseMonitoring (e) {
  var obj;
  if (!e)
    e = window.event;
  obj = (e.target) ? e.target : e.srcElement;
  mouseCnt++;
  mouseX = e.clientX,
  mouseY = e.clientY,
  mouseTag = obj.tagName;
  wipeTile(obj, 0, 0.1);
//  if (wanderingTileOn) moveWanderingTile();
  if (blockingTileOn) moveBlockingTile();
//document.getElementById("monitor-mouse").innerHTML = "<strong>MYSZA:</strong> " + mouseCnt + " [" + mouseX + "," + mouseY + "]/" + mouseTag;
}//mouseMonitoring
*/

/*
var keyboardChar = "",
    keyboardString = "";
function keyboardMonitoring (e) {
  if (!e)
    e = window.event;
  keyboardChar = String.fromCharCode(e.keyCode? e.keyCode : e.which);
  keyboardString += keyboardChar;
  document.getElementById("keyboardIn").innerHTML = keyboardString;
//document.getElementById("monitor-keyboard").innerHTML += keyboardChar;
}//keyboardMonitoring
*/

var windowWidth = 0,
    windowHeight = 0;
function resizeMonitoring () {
  windowWidth = window.innerWidth;// || document.body.clientWidth || document.documentElement.clientWidth;
  windowHeight = window.innerHeight;// || document.body.clientHeight || document.documentElement.clientHeight;
  setMainPannelSize();
}//resizeMonitoring

function resizeControlPannel () {
  var center = map.getCenter();
  if (document.getElementById('control-pannel').style.left == "0px") {//document.getElementById('control-control').innerHTML == " < ") {
    document.getElementById('control-control').innerHTML = " > ";
    document.getElementById('control-pannel').style.left = "-200px";
//    document.getElementById('map-pannel').style.left = "0px";
  }//if
  else {
    document.getElementById('control-control').innerHTML = " < ";
    document.getElementById('control-pannel').style.left = "0px";
//    document.getElementById('map-pannel').style.left = "200px";
  }//else
  map.setCenter(center);
  google.maps.event.trigger(map, 'resize');
}//resizeControlPannel

function setMainPannelSize () {
//  document.getElementById("map-pannel").style.width = windowWidth - document.getElementById("control-pannel").offsetWidth + "px";
}//setMainPannelSize


/*
function visitCounter (newVisit) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200)
        document.getElementById("visit-counters").innerHTML = this.responseText;
    };//function()
  xhttp.open("GET", "php/visitCounter.php?new_visit=" + newVisit);
  xhttp.send();
}//visitCounter
*/

/*
function setVisitSiteCookie () {
  var expDate = new Date();
  expDate.setTime(expDate.getTime() + (365*24*60*60*1000));
  var expiresTxt = "expires=" + expDate.toUTCString();
  var visitNo = 0;
  var cookiesTab = document.cookie.split(';');

  for (var i = 0; i < cookiesTab.length && visitNo == 0; i++) {
    cookiesTab[i] = cookiesTab[i].trim();
    if (cookiesTab[i].substr(0, cookiesTab[i].indexOf("=")) == "VisitNo")
      visitNo = cookiesTab[i].substr(cookiesTab[i].indexOf("=") + 1, cookiesTab[i].length);
  }//for
  visitNo++;
  document.cookie = "VisitNo=" + visitNo + ";" + expiresTxt;
  if (1 < visitNo)
    document.getElementById("cookies-alert").style.display = "none";
  visitCounter(visitNo == 1);
}//setVisitSiteCookie
*/


/*
function hideMonitors () {
  document.getElementById("monitor-mouse").style.display = "none";
  document.getElementById("monitor-keyboard").style.display = "none";
  document.getElementById("monitor-mainsize").style.display = "none";
  document.getElementById("monitor-mainscroll").style.display = "none";
  document.getElementById("monitor-monitor").style.display = "none";
}//hideMonitors
*/

var mapCenter;//  = new google.maps.LatLng(52.140154, 21.069696);//
var mapDiv;//     = document.getElementById("map-pannel");       //
var mapOptions;// = {center: mapCenter, zoom: 12, mapTypeId: google.maps.MapTypeId.HYBRID};
var map;
var marker;
var curr_lat = 1000;
var curr_lng = 1000;


function myMapX () {
  if (-90 <= curr_lat && curr_lat <= 90 && -180 <= curr_lng && curr_lng <= 180) {
    mapCenter  = new google.maps.LatLng(curr_lat, curr_lng);
//    document.getElementById('cbb').innerHTML += "1";
  }
  else {
    mapCenter  = new google.maps.LatLng(52.140154, 21.069696);//
//    document.getElementById('cbb').innerHTML += "2";
  }
  mapDiv     = document.getElementById("map-pannel");       //
  mapOptions = {center: mapCenter, zoom: 12, mapTypeId: google.maps.MapTypeId.HYBRID};
  map = new google.maps.Map(mapDiv, mapOptions);

/*
  google.maps.event.addListener(marker, 'click', function() {
    map.setZoom(map.getZoom()==12? 15 : 12);
    map.setCenter(marker.getPosition());
  });
*/

  google.maps.event.addListener(map, 'center_changed', refreshMapCentre);

  google.maps.event.addListener(map, 'dblclick', function(event) {
    var location = event.latLng;
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    var infowindow = new google.maps.InfoWindow({
      content: 'latitude: ' + location.lat() + '<br>longitude: ' + location.lng()
    });
    infowindow.open(map,marker);
  });
//  document.getElementById('cbb').innerHTML += "3";

  marker2 = new google.maps.Marker({position: new google.maps.LatLng(52.1403, 21.0699),
                                    animation:google.maps.Animation.BOUNCE,
                                    icon: "favicon.ico"
                                  });
  marker2.setMap(map);
  var infowindow = new google.maps.InfoWindow({
    content: "I co jeszcze?"
  });
//  document.getElementById('cbb').innerHTML += "4";

  google.maps.event.addListener(marker2, 'dblclick', function() {
    infowindow.open(map, marker2);
  });
//  document.getElementById('cbb').innerHTML += "5";

}//myMapX

myMap = myMapX;

function setZoomControls () {
  document.getElementById('zoom-value').innerHTML = map.getZoom();
  document.getElementById('zoom-in').onclick = function () {
    map.setZoom(map.getZoom() + 1);
    document.getElementById('zoom-value').innerHTML = map.getZoom();
  };
  document.getElementById('zoom-out').onclick = function () {
    map.setZoom(map.getZoom() - 1);
    document.getElementById('zoom-value').innerHTML = map.getZoom();
  };
  document.getElementById('zoom-value').onclick = function () {
    var zv = map.getZoom();
    if (zv <= 11)
      map.setZoom(zv == 1? 12 : 1);
   else
      map.setZoom(zv == 21? 11 : 21);
    document.getElementById('zoom-value').innerHTML = map.getZoom();
  };
}//setZoomControls

function makeCircle () {
  var myCity = new google.maps.Circle({
    center: map.getCenter(),
    radius: 150,
    strokeColor: "#ff0000",
    strokeOpacity: 0.7,
    strokeWeight: 1,
    fillColor: "#990000",
    fillOpacity: 0.2,
    editable: true
  });
  myCity.setMap(map);
//document.getElementById('cbb').innerHTML += "2";
}//makeCircle

function refreshMapCentre () {
  var center = map.getCenter();
  document.getElementById('map-centre-lat').innerHTML = Math.round(center.lat() * 10000) / 10000;
  document.getElementById('map-centre-lng').innerHTML = Math.round(center.lng() * 10000) / 10000;
}//makeCircle


function initAll () {
  windowWidth = window.innerWidth;// || document.body.clientWidth || document.documentElement.clientWidth;
  windowHeight = window.innerHeight;// || document.body.clientHeight || document.documentElement.clientHeight;
//  setMainPanelSize();
//  document.body.onresize = resizeMonitoring;
//  document.body.onresize();
  setZoomControls();
  document.getElementById('control-pannel').style.left = "0px";
//  document.getElementById('map-pannel').style.left = "200px";
  document.getElementById('control-control').onclick = resizeControlPannel;

  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(function (position) {
      curr_lat = position.coords.latitude;
      curr_lng = position.coords.longitude;
      map.setCenter({lat: curr_lat, lng: curr_lng});
    });

  document.getElementById('centre-me').onclick = function () {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(function (position) {
        curr_lat = position.coords.latitude;
        curr_lng = position.coords.longitude;
        map.setCenter({lat: curr_lat, lng: curr_lng});
      });
  };

  document.getElementById('marker-the-centre').onclick = function () {
    var marker = new google.maps.Marker({position: map.getCenter()});//map.getCenter());//
    marker.setMap(map);
//    document.getElementById('cbb').innerHTML += "6";
  };

  document.getElementById('make-circle').onclick = makeCircle;

  refreshMapCentre();

//  document.body.onmousemove = mouseMonitoring;
//  document.body.onkeypress = keyboardMonitoring;
//  setVisitSiteCookie();
}//initAll

window.onload = initAll;
//AIzaSyCCf4KvfFVTv0ioZDLPAR7xlifVCB_8KCU
