//let userinput = "spider-man";

// HTTP Request
function loadData() {
  let userinput = document.querySelector("input").value
  const searchSec = document.querySelector(".comicList")
  let characterID = ""
  let input = encodeURI(userinput)
  let characterName = ""
  let charImaUrl = ""
  let chaSeries = ""
  let seriesArr = []
  let searchString =
    "https://gateway.marvel.com:443/v1/public/characters?name=" +
    input +
    "&apikey=ee1f0c547b636265ac05222e1efd5e25"

  // ajax Request
  let xhr = new XMLHttpRequest()
  xhr.open("GET", searchString, true)
  xhr.onload = function() {
    let responseOject = JSON.parse(xhr.responseText)
    let characterVal = responseOject.data.count
    let searchHead = document.querySelector("h2")

    console.log(responseOject)
    if (characterVal > 0) {
      characterName = responseOject.data.results[0].name
      characterID = responseOject.data.results[0].id
      let characterImage = responseOject.data.results[0].thumbnail.path
      let imageX = responseOject.data.results[0].thumbnail.extension
      charImaUrl = characterImage + "." + imageX
      searchHead.innerHTML = "Here are some comics from " + characterName
      //let characterInsert = "<p id='char'><img id='char2' src=" + charImaUrl + "></p>"
      //const characterDisplay = document.querySelector("h2")
      //characterDisplay.insertAdjacentHTML("afterend", characterInsert)
      console.log(characterName)
      console.log(charImaUrl)
      console.log(characterID)
      comicPop()

      let comics = []
      let comicsImageUrl = []
      function comicPop() {
        let comicString =
          "https://gateway.marvel.com:443/v1/public/characters/" +
          characterID +
          "/comics?apikey=ee1f0c547b636265ac05222e1efd5e25"

        let comicXHR = new XMLHttpRequest()
        comicXHR.open("GET", comicString, true)
        comicXHR.onload = function() {
          let comicOject = JSON.parse(comicXHR.responseText)
          console.log(comicOject)
          // characterName = comicOject.data.results[0].name;

          for (let j = 0; j < comicOject.data.results.length; j++) {
            comicTitle = comicOject.data.results[j].title
            let comicImage = comicOject.data.results[j].thumbnail.path
            let comicX = comicOject.data.results[j].thumbnail.extension
            let comicLink = comicOject.data.results[j].urls[0].url
            console.log(comicLink)
            let comicImaUrl = comicImage + "." + comicX
            let comicInsert =
              "<li><img src=" +
              comicImaUrl +
              ' ><a href="' +
              comicLink +
              '">' +
              comicTitle +
              "</a></li>"
            searchSec.insertAdjacentHTML("afterbegin", comicInsert)
            comics.push(comicTitle)
            comicsImageUrl.push(comicImaUrl)
          }
        }
        comicXHR.send(null)
      }
      //var viewMoreBtn = document.querySelector("")
      let viewMoreTxt =
        '<p id="marvellink"><a href="https://www.marvel.com">View more at Marvel</a></p>'
      searchSec.insertAdjacentHTML("afterend", viewMoreTxt)
    } else {
      var failTxt =
        "<img id='failPic' class='failClass' src='./images/marvelgame_over.png'>"
      searchHead.innerHTML = "Not a Marvel character, please try again!"
      searchSec.insertAdjacentHTML("afterbegin", failTxt)
    }
  }
  xhr.send(null)
}
const comicClear = document.querySelector(".comicList")

const buttonSub = document.querySelector("form")
buttonSub.addEventListener("submit", function(e) {
  comicClear.innerHTML = ""
  e.preventDefault()
  loadData()
})
