//var userinput = "spider-man";

// HTTP Request
function loadData(){
var userinput = document.querySelector('input').value;

var xhr = new XMLHttpRequest();
xhr.open('GET','https://gateway.marvel.com:443/v1/public/characters?name=' + userinput +'&apikey=ee1f0c547b636265ac05222e1efd5e25',true);
xhr.onload = function (){
  var characterName = "";
  var charImaUrl = "";

  var responseOject = JSON.parse(xhr.responseText);
  console.log(responseOject);
  console.log();
  characterName = responseOject.data.results[0].name;
  var characterImage = responseOject.data.results[0].thumbnail.path;
  var imageX = responseOject.data.results[0].thumbnail.extension;
  charImaUrl = characterImage + "." + imageX;
  console.log(characterName);
  console.log(charImaUrl);

   for (var j = 0; j < responseOject.data.results[0].series.items.length; j++) {
     var chaSeries = responseOject.data.results[0].series.items[j];
     console.log(chaSeries);
   }

};
xhr.send(null);
}
//window.addEventListener('load',loadData);
var buttonSub = document.querySelector('.button');



// buttonSub.addEventListener('click', function(){
//   var userinput = document.querySelector('input').value;
//   loadData();
// }, false);
