function factorial (n) {//do 100
  var i, s = 1;
  n = Math.round(n);
  if (100 < n)
    n = 100;
  for (i = 1; i <= n; i++)
    s *= i;
  return s;
}//function factorial


var elements = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var combinationsTable = [];

function addCombination (row, k) {
  var newrow = new Array(k);
  if (0 < k) {
    for (var i = 0; i < k; i++)
      newrow[i] = elements[row[i]];
    combinationsTable.push(newrow);
  }//if
}//function addCombination

function makeCombinations (row, c, k, s, n) {
  if (k <= n && c < k && s < n) {
    if (c < k-1) {
      while (k - c <= n - s) {
        row[c] = s++;
        makeCombinations(row, c + 1, k, s, n);
      }//while
    }//if
    else {
      if (c == k - 1) {
        while (s < n) {
          row[c] = s++;
          addCombination(row, k);
        }//while
      }//if
    }//else
  }//if
} //function makeCombinations

function makeCombinationsTable (kValue, nValue, elementsNames) {
  var row = new Array(kValue);
  //document.getElementById("monitor").innerHTML += "przed:" + elements + "<br>";
  elements = elementsNames;//w końcu moźe mogą być różne źródła
  //document.getElementById("monitor").innerHTML += "po:" + elements + "<br>";
  //document.getElementById("monitor").innerHTML += "makeCombinationsTable:: kValue=" + kValue + ", nValue=" + nValue + "<br>";
  //document.body.style.cursor = "wait";
  while (combinationsTable.length) {
    delete combinationsTable[combinationsTable.length - 1];
    combinationsTable.pop();
  }//while
  makeCombinations(row, 0, kValue, 0, nValue);
  //document.getElementById("monitor").innerHTML += "combinationsTable=[" + combinationsTable + "]<br>";
  //document.body.style.cursor = "auto";
  return combinationsTable;
}//function makeCombinationsTable


var permutationsTable = [];
var permutationsNum = 0;

function makePermutations (row, c, k) {
  var newrow = new Array(k);
  var i, el;

  for (i = 0; i < k; i++) {
    newrow[i] = row[i];
  }//for
  if (c < k - 1) {
    for (i = 0; c + i < k; i++) {
      //document.getElementById("monitor").innerHTML += "<br>[" + c + "," + i + "]=" + newrow + ",";
      el = newrow[c + i];//newrow[c] = row[c + i];
      newrow[c + i] = newrow[c];//newrow[c + i] = row[c];
      newrow[c] = el;
      //document.getElementById("monitor").innerHTML += "=>" + newrow + ", ";
      makePermutations(newrow, c + 1, k);
      //document.getElementById("monitor").innerHTML += "=>p>" + newrow + "<br>";
    }//for
  }//if
  else {
    if (c == k - 1) {
      permutationsNum++;
//      if (permutationsNum <= 1000) {
        permutationsTable.push(newrow);
//      }
    }//if
  }//else
} //function makePermutations

function makePermutationsTable (kValue) {
  var i, combinationsNumber;
  var row = Array(kValue);
  permutationsNum = 0;

  //document.getElementById("monitor").innerHTML += "makePermutationsTable:: kValue=" + kValue + "<br>";
  //document.body.style.cursor = "wait";
  //window.alert("makePermutationsTable - start");
  while (permutationsTable.length) {
    delete permutationsTable[permutationsTable.length - 1];
    permutationsTable.pop();
  }
  combinationsNumber = combinationsTable.length;
  for (i = 0; i < combinationsNumber; i++) {
    makePermutations(combinationsTable[i], 0, kValue);
  }//for
  //document.getElementById("monitor").innerHTML += "permutationsTable=[" + permutationsTable + "]<br>";
  //document.body.style.cursor = "auto";
  //window.alert("stop - makePermutationsTable");
  return permutationsTable;
}//function makePermutationsTable


var tpRotationsApp = angular.module('tpRotationsApp', []); //rejestracja aplikacji

tpRotationsApp.controller('tpRotationsCtrl', function($scope) {
  $scope.kValue = 3;
  $scope.nValue = 4;
  $scope.maxValue = 24;
  $scope.elementsIndices = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
  $scope.elementsNames   = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

  $scope.lw = function () {
      if ($scope.kValue <= $scope.nValue) {
        return factorial($scope.nValue) / (factorial($scope.kValue)*factorial($scope.nValue - $scope.kValue));
      }
      $scope.kValue = $scope.nValue;
      return 0;
    };
  $scope.lk = function () {
      return factorial($scope.nValue) / factorial($scope.nValue - $scope.kValue);
    };

  $scope.makeTables = function () {
      //document.getElementById("monitor").innerHTML += "$scope.makeTables:: kValue=" + $scope.kValue + ", nValue=" + $scope.nValue + "<br>";
      if (($scope.combinations = makeCombinationsTable($scope.kValue, $scope.nValue, $scope.elementsNames)) != -1) {
        $scope.permutations = makePermutationsTable($scope.kValue);
      }//if
    };//function makeTables
  $scope.makeTables();

  $scope.combinationsNumber = function () {
      //$scope.combinations = makeCombinationsTable ($scope.kValue, $scope.nValue);
      return $scope.combinations.length;
    };
  $scope.permutationsNumber = function () {
      //$scope.permutations = makePermutationsTable ($scope.kValue);
      return $scope.permutations.length;//permutationsNum;
    };
});

/*
function makeTable (kValue, nValue) {
  var i, j;
  var row = Array(kValue);
  var elements = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  while (table.length) {
    delete table[table.length-1];
    table.pop();
  }
  for (i = 0; i < nValue; i++) {
    for (j = 0; j < kValue; j++)
      row[j] = elements[i+j];
    table[i] = [];//!!!!!!!!!!!!!!!!!!!!!!!!!!!
    for (j = 0; j < kValue; j++)
      table[i][j] = row[j];
  }//for
  return table;
}//function makeTable
*/
