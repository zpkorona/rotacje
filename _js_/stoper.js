var stoperSvg1,
    stoperCtx1,
    stoperRad1,
    stoperTime1 = 1000,
    clockSvg2,
    clockCtx2,
    clockRad2;

function drawClockStoperFace (faceCtx, faceRad) {
var grad;
//  faceCtx.beginPath();//kółko w środku
//    faceCtx.arc(0, 0, faceRad*0.1, 0, 2*Math.PI);
//    faceCtx.fillStyle = "black";//"#47d147";
//    faceCtx.fill();

  faceCtx.beginPath();                      //tło zegara
    faceCtx.arc(0, 0, faceRad, 0, 2*Math.PI);//kółko context.arc(x,y,r,sAngle,eAngle,counterclockwise)
    grad = faceCtx.createRadialGradient(0, 0, 0, 0, 0, faceRad);//context.createRadialGradient(x0,y0,r0,x1,y1,r1);
    grad.addColorStop(0,"green");
    grad.addColorStop(0.05,"green");
    grad.addColorStop(0.1,"#d6f5d6");
    grad.addColorStop(0.98,"#d6f5d6");
    grad.addColorStop(1,"green");
    faceCtx.fillStyle = grad;//"#d6f5d6";
    faceCtx.fill();                       //wypełnienie
    grad = faceCtx.createRadialGradient(0, 0 , faceRad*0.98, 0, 0, faceRad*1.02);//context.createRadialGradient(x0,y0,r0,x1,y1,r1);
    grad.addColorStop(0,"#d6f5d6");
    grad.addColorStop(0.7,"green");
    grad.addColorStop(1,"#d6f5d6");
    faceCtx.strokeStyle = grad;
    //faceCtx.strokeStyle = blue;//"#47d147";
    faceCtx.lineWidth = faceRad*0.05;
    faceCtx.stroke();                     //obwód koła

  var angle;
  var number;
  faceCtx.beginPath();
    faceCtx.lineWidth = faceRad*0.01;
    faceCtx.strokeStyle = "#47d147";
    for (number = 1; number <= 60; number++) {
      //if (number % 5) {
        angle = number * Math.PI / 30;
        faceCtx.rotate(angle);                    //obrót w prawo
        faceCtx.moveTo(0, -faceRad*0.90);    //przesunięcie środka
        faceCtx.lineTo(0, -faceRad);                   //wyprostowanie - obrot w lewo
        faceCtx.stroke(); 
        faceCtx.moveTo(0, faceRad);     // przesunięcie środka do środka
        faceCtx.rotate(-angle);                   //wyprostowanie
      //}//if
    }//for
    faceCtx.fillStyle = "red";
    faceCtx.font = faceRad*0.2 + "px courier";
    faceCtx.textBaseline = "middle";
    faceCtx.textAlign = "center";
    for (number = 1; number <= 12; number++) {
      angle = number * Math.PI / 6;
      faceCtx.rotate(angle);                    //obrót w prawo
      faceCtx.translate(0, -faceRad*0.85);    //przesunięcie środka
      //faceCtx.rotate(-angle);                   //wyprostowanie - obrot w lewo
      faceCtx.fillText(number.toString(), 0, 0); //napis
      //faceCtx.rotate(angle);                    //obrot w prawo = znów krzywo
      faceCtx.translate(0, faceRad*0.85);     // przesunięcie środka do środka
      faceCtx.rotate(-angle);                   //wyprostowanie
    }//for
}//drawClockStoperFace

function drawHand (faceCtx, handAng, handLen, handWidth) {
  faceCtx.moveTo(0, 0);             //do środka
  faceCtx.rotate(handAng);          //obrót
  faceCtx.beginPath();
    faceCtx.lineWidth = handWidth;  //szerokość wskazówki
    faceCtx.moveTo(0, handLen*0.2); //do środka
    faceCtx.lineTo(0, -handLen);    //linia
    faceCtx.stroke();               //malowanie
    faceCtx.rotate(-handAng);       //wyprostowanie
}//drawHand

function drawCurrentTime (faceCtx, faceRad) {
  var now = new Date(),
      hour = now.getHours() % 12,
      minute = now.getMinutes(),
      second = now.getSeconds(),
      grad,
      angle;
  document.getElementById("ddd1").innerHTML = (hour<10?"0":"") + hour + ":" + 
                                              (minute<10?"0":"") + minute + ":" + 
                                              (second<10?"0":"") + second;
  faceCtx.lineCap = "round";//zaokrąglony koniec
  //hour = hour%12;
  grad = faceCtx.createLinearGradient(0, 0, 0, -faceRad*0.72);
      grad.addColorStop(0, "green");
      grad.addColorStop(1, "red");
      faceCtx.strokeStyle = grad;
  angle = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
  drawHand (faceCtx, angle, faceRad*0.6, faceRad*0.1);
  //minute
  grad = faceCtx.createLinearGradient(0, 0, 0, -faceRad*0.90);
      grad.addColorStop(0, "green");
      grad.addColorStop(1, "red");
      faceCtx.strokeStyle = grad;
  angle = (minute*Math.PI/30) + (second*Math.PI/(30*60));
  drawHand(faceCtx, angle, faceRad*0.75, faceRad*0.08);
  // second
  grad = faceCtx.createLinearGradient(0, 0, 0, -faceRad*1.08);
      grad.addColorStop(0, "green");
      grad.addColorStop(1, "red");
      faceCtx.strokeStyle = grad;
  angle=(second*Math.PI/30);
  drawHand(faceCtx, angle, faceRad*0.9, faceRad*0.02);
}//drawCurrentTime

function drawClock () {
  drawClockStoperFace(clockCtx2, clockRad2);
  drawCurrentTime(clockCtx2, clockRad2);
}//drawStoper


function initClocks () {
  clockSvg2 = document.getElementById("clock-svg");
  clockCtx2 = clockSvg2.getContext("2d");      
  clockRad2 = clockSvg2.height / 2;              
  clockCtx2.translate(clockRad2, clockRad2);                 //ustawienia pozycji (0,0) rysowania
  clockRad2 = clockRad2 * 0.95;
  drawClock();
  setInterval(drawClock, 1000);

  stoperSvg1 = document.getElementById("stoper-svg");
  stoperCtx1 = stoperSvg1.getContext("2d");      
  stoperRad1 = stoperSvg1.height / 2;              
  stoperCtx1.translate(stoperRad1, stoperRad1);                 //ustawienia pozycji (0,0) rysowania
  stoperRad1 = stoperRad1 * 0.95;
  stoperTime1 = 1*3600 + 10*60 + 30;
  drawStoper1();
  setInterval(drawStoper1, 1000);
}// initClocks
window.onload = initClocks;


function drawStoper1 () {
  drawClockStoperFace(stoperCtx1, stoperRad1);
  drawStoperTime(stoperCtx1, stoperRad1, stoperTime1);
  stoperTime1--;
}//drawStoper1

function drawStoperTime (faceCtx, faceRad, stoperTime) {
  var hour = Math.floor(stoperTime/3600) % 12,
      second = stoperTime % 60,
      minute = (stoperTime - hour*3600 - second) / 60,
      grad,
      angle;
  document.getElementById("ddd2").innerHTML = (hour<10?"0":"") + hour + ":" + 
                                              (minute<10?"0":"") + minute + ":" + 
                                              (second<10?"0":"") + second;
  faceCtx.lineCap = "round";//zaokrąglony koniec
  //hour = hour%12;
  grad = faceCtx.createLinearGradient(0, 0, 0, -faceRad*0.72);
      grad.addColorStop(0, "green");
      grad.addColorStop(1, "red");
      faceCtx.strokeStyle = grad;
  angle = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
  drawHand (faceCtx, angle, faceRad*0.6, faceRad*0.1);
  //minute
  grad = faceCtx.createLinearGradient(0, 0, 0, -faceRad*0.90);
      grad.addColorStop(0, "green");
      grad.addColorStop(1, "red");
      faceCtx.strokeStyle = grad;
  angle = (minute*Math.PI/30) + (second*Math.PI/(30*60));
  drawHand(faceCtx, angle, faceRad*0.75, faceRad*0.08);
  // second
  grad = faceCtx.createLinearGradient(0, 0, 0, -faceRad*1.08);
      grad.addColorStop(0, "green");
      grad.addColorStop(1, "red");
      faceCtx.strokeStyle = grad;
  angle=(second*Math.PI/30);
  drawHand(faceCtx, angle, faceRad*0.9, faceRad*0.02);
}//drawStoperTime
