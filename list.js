//var userinput = "spider-man";

// HTTP Request
function loadData(){
const userinput = document.querySelector('input').value;
const searchSec = document.querySelector('.comicList');
let input = encodeURI(userinput)
var characterName = "";
var charImaUrl = "";
var chaSeries = "";
var seriesArr = [];
console.log(searchSec);
console.log(input);

https://gateway.marvel.com:443/v1/public/characters/hulk/comics?apikey=ee1f0c547b636265ac05222e1efd5e25

// ajax Request
var xhr = new XMLHttpRequest();
xhr.open('GET','https://gateway.marvel.com:443/v1/public/characters/' + input +'/comics?apikey=ee1f0c547b636265ac05222e1efd5e25',true);
xhr.onload = function (){

  var responseOject = JSON.parse(xhr.responseText);

  console.log(responseOject);
  characterName = responseOject.data.results[0].name;
  characterImage = responseOject.data.results[0].thumbnail.path;
  var imageX = responseOject.data.results[0].thumbnail.extension;
  charImaUrl = characterImage + "." + imageX;
  console.log(characterName);
  console.log(charImaUrl);



   for (var j = 0; j < responseOject.data.results[0].series.items.length; j++) {
     chaSeries = responseOject.data.results[0].series.items[j].name;
     seriesArr.push(chaSeries);
     console.log(chaSeries);
   }
   console.log(seriesArr);
   // ===========================================
  //  foreach(comic in chaSeries){
   //
  //    //searchSec.insertAdjacentHTML('afterbegin', '<div id="two">two</div>');
  //  }



   // ===========================================

};
xhr.send(null);
}
//window.addEventListener('load',loadData);
const buttonSub = document.querySelector('form');
buttonSub.addEventListener('submit',function(e){
  e.preventDefault()
  loadData();
})
