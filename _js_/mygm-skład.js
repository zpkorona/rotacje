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

function setMainPannelSize () {
  document.getElementById("map-pannel").style.width = windowWidth - document.getElementById("control-pannel").offsetWidth + "px";
}//setMainPannelSize


/*
function hideMonitors () {
  document.getElementById("monitor-mouse").style.display = "none";
  document.getElementById("monitor-keyboard").style.display = "none";
  document.getElementById("monitor-mainsize").style.display = "none";
  document.getElementById("monitor-mainscroll").style.display = "none";
  document.getElementById("monitor-monitor").style.display = "none";
}//hideMonitors
*/

function myMap1 () {
  var place = {
                lat: 52.140154,
                lng: 21.069696
              };
  var map = new google.maps.Map(
              document.getElementById("map-pannel"),
              {
                center: place,
                zoom: 17
              });
  var marker = new google.maps.Marker({
                 position: place,
                 map: map
               });
}//myMap1


function myMap2 () {
  var mapProp = { center: new google.maps.LatLng(52.140154, 21.069696), zoom: 15, mapTypeId: google.maps.MapTypeId.ROADMAP};
  var map = new google.maps.Map(document.getElementById("map-pannel"), mapProp);
}//myMap2
function myMap3 () {
  var mapProp = { center: new google.maps.LatLng(52.140154, 21.069696), zoom: 15, mapTypeId: google.maps.MapTypeId.SATELLITE};
  var map = new google.maps.Map(document.getElementById("map-pannel"), mapProp);
}//myMap3
function myMap4 () {
  var mapProp = { center: new google.maps.LatLng(52.140154, 21.069696), zoom: 15, mapTypeId: google.maps.MapTypeId.HYBRID};
  var map = new google.maps.Map(document.getElementById("map-pannel"), mapProp);
}//myMap4
function myMap5 () {
  var mapProp = { center: new google.maps.LatLng(52.140154, 21.069696), zoom: 15, mapTypeId: google.maps.MapTypeId.TERRAIN};
  var map = new google.maps.Map(document.getElementById("map-pannel"), mapProp);
}//myMap5

var map;

function myMap6 () {
  var mapCenter  = new google.maps.LatLng(52.140154, 21.069696);
  var mapDiv     = document.getElementById("map-pannel");
  var mapOptions = {center: mapCenter, zoom: 12, mapTypeId: google.maps.MapTypeId.HYBRID};
  map = new google.maps.Map(mapDiv, mapOptions);
  var marker = new google.maps.Marker({position: mapCenter});
  marker.setMap(map);

  var myCity = new google.maps.Circle({
    center: mapCenter,
    radius: 1500,
    strokeColor: "#000099",
    strokeOpacity: 0.7,
    strokeWeight: 1,
    fillColor: "#000099",
    fillOpacity: 0.2,
    editable: true
  });
  myCity.setMap(map);

  google.maps.event.addListener(marker, 'click', function() {
    map.setZoom(map.getZoom()==12? 15 : 12);
    map.setCenter(marker.getPosition());
  });

  google.maps.event.addListener(map, 'dblclick', function(event) {
    var location = event.latLng;
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    var infowindow = new google.maps.InfoWindow({
      content: 'szerokość: ' + location.lat() + '<br>długość: ' + location.lng()
    });
    infowindow.open(map,marker);
  });

  marker2 = new google.maps.Marker({position: new google.maps.LatLng(52.16, 21.1),
                                    animation:google.maps.Animation.BOUNCE,
                                    icon: "favicon.ico"
                                  });
  marker2.setMap(map);
  var infowindow = new google.maps.InfoWindow({
    content: "I co jeszcze?"
  });
  google.maps.event.addListener(marker2, 'dblclick', function() {
    infowindow.open(map, marker2);
  });

}//myMap6

function myMap7 () {
  var stavanger = new google.maps.LatLng(58.983991,5.734863);
  var amsterdam = new google.maps.LatLng(52.395715,4.888916);
  var london = new google.maps.LatLng(51.508742,-0.120850);

  var mapCanvas = document.getElementById("map-pannel");
  var mapOptions = {center: amsterdam, zoom: 4};
  var map = new google.maps.Map(mapCanvas,mapOptions);

  var flightPath = new google.maps.Polyline({
    path: [stavanger, amsterdam, london],
    strokeColor: "#0000FF",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    editable: true
  });
  flightPath.setMap(map);
}//myMap7

myMap = myMap6;

function initAll () {

  windowWidth = window.innerWidth;// || document.body.clientWidth || document.documentElement.clientWidth;
  windowHeight = window.innerHeight;// || document.body.clientHeight || document.documentElement.clientHeight;
//  setMainPanelSize();
  document.body.onresize = resizeMonitoring;
  document.body.onresize();

  document.getElementById("zoom-value").innerHTML = map.getZoom();
  document.getElementById("zoom-in").onclick = function () {
    map.setZoom(map.getZoom() + 1);
    document.getElementById("zoom-value").innerHTML = map.getZoom();
  };
  document.getElementById("zoom-out").onclick = function () {
    map.setZoom(map.getZoom() - 1);
    document.getElementById("zoom-value").innerHTML = map.getZoom();
  };
  document.getElementById("zoom-value").onclick = function () {
    var zv = map.getZoom();
    if (zv <= 11)
      map.setZoom(zv == 1? 12 : 1);
   else
      map.setZoom(zv == 21? 11 : 21);
    document.getElementById("zoom-value").innerHTML = map.getZoom();
  };

//window.alert("windowWidth=" + windowWidth + ", window.innerWidth=" + window.innerWidth + ", windowHeight=" + windowHeight + ", window.innerHeight=" + window.innerHeight);

//if(window.innerWidth <= 800 && window.innerHeight <= 600) {
//if (typeof window.orientation !== 'undefined')

/*
  var scrolledObj = document.getElementById("main-pannel");//zamiast document.body;

//  document.body.onmousemove = mouseMonitoring;
//  document.body.onkeypress = keyboardMonitoring;


  setVisitSiteCookie();

  initMainBodyDivs();
  scrolledObj.onscroll = topBannerRoll;
  document.getElementById("goto-top-box").onclick = function () {headerJustChanged = false; scrolledObj.scrollTop = 0;};
  startTopBannerAds();
  setMenuVisibility();

  hidePresentations();

  initBookstands();
  document.getElementById("iframe-display3").style.display = "none";
  document.getElementById("video-display3").style.display = "none";
  document.getElementById("audio-display3").style.display = "none";

//  hideMonitors();
//  document.getElementById("monitor-mouse").innerHTML = "<strong>MOUSE:</strong>";
//  document.getElementById("monitor-keyboard").innerHTML = "<strong>KBD INPUT:</strong>";
//  document.getElementById("monitor-mainsize").innerHTML = "<strong>SIZE:</strong>";
//  document.getElementById("monitor-mainscroll").innerHTML = "<strong>SCROLL:</strong>";
//  document.getElementById("monitor-monitor").innerHTML = "<strong>MONITOR:</strong>";
*/
}//initAll

window.onload = initAll;
