var elementsTab = [['a', true], //0
                   ['b', true], //1
                   ['c', true], //2
                   ['d', true], //3
                   ['e', true], //4
                   ['f', true], //5
                   ['g', true], //6
                   ['h', true], //7
                   ['i', true], //8
                   ['j', true], //9
                   ['k', true], //10
                   ['l', true], //11
                   ['m', true], //12
                   ['n', true], //13
                   ['o', true], //14
                   ['p', true], //15
                   ['q', true], //16
                   ['r', true], //17
                   ['s', true], //18
                   ['t', true], //19
                   ['u', true], //20
                   ['v', true], //21
                   ['w', true], //22
                   ['x', true], //23
                   ['y', true], //24
                   ['m', true]];//25
var permutation = ["", "", "", "", "", "", "", "", "", "", 
                   "", "", "", "", "", "", "", "", "", "", 
                   "", "", "", "", "", ""];
var maxElemNum  = 26,
    elementsN   = 6,
    elementsK   = 6,
            
function prepareElementsTab (N) {
  var i;
  if (N < 2)
    elementsN = 2;
  else  
    if (maxElemNum < N)
      elementsN = maxElemNum;
    else  
      elementsN = N;
  for (i = 0; i < elementsN; i++)    
    elementsTab[i][1] = true;
  for ( ; i < maxElemNum; i++)    
    elementsTab[i][1] = false;
}//prepareElements

function preparePermutation (K) {
  var i;
  if (K < 2)
    elementsK = 2;
  else  
    if (maxElemNum < K)
      elementsK = maxElemNum;
    else  
      elementsK = K;
  for (i = 0; i < elementsK; i++)    
    permutation[i] = "-";
  for ( ; i < maxElemNum; i++)    
    permutation[i] = "";
}//prepareElements

function getNextElement (elem) {
  var i = 0,
      elemPos;
  if (elem != "") {
    for ( ; elem != elementsTab[i][0] && i < elementsN; i++);//dojazd do elem
    elem = "";
    elemPos = i;
  }//if
  while (elem == "" && i < elementsN)
    if (elementsTab[i][1]) {
      elem = elementsTab[i][0];
      elementsTab[i][1] = false;
    }//if
    else   
      i++;//dojazd do elem
  if (elem == "" && i == elementsN)
    for (i = 0; elem == "" && i < elemPos; i++)
      if (elementsTab[i][1]) {
        elem = elementsTab[i][0];
        elementsTab[i][1] = false;
      }//if
  return elem;
}//getNextElement

function releaseElement (elem) {
  var i;
  if (elem != "") {
    for (i = 0 ; elem != elementsTab[i][0] && i < elementsN; i++);//dojazd do elem
    elementsTab[i][1] = true;
  }//if
  return i;
}//releaseElement

function addNextElement2permutation (elem, elemPos) {
  
  
  for (var i = elemPos; i < eleemntsN; i++) {
    elem = getNextElement(elem);
    permutation[elemPos] = elem;
    if (elemPos < elementsK - 1) {
      addNextElement2permutation(elem, elemPos + 1);
    }//if
    else {
      pushPermutation2table();
    }//else
    releaseElement(elem);
  }//for
  
}//addNextElement2permutation