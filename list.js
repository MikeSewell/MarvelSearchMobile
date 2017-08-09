// HTTP Request
function loadData() {
  const userinput = document.querySelector("input").value
  const searchSec = document.querySelector(".comicList")
  const input = encodeURI(userinput)
  let characterID = ""
  let characterName = ""
  let searchString =
    "https://gateway.marvel.com:443/v1/public/characters?name=" +
    input +
    "&apikey=ee1f0c547b636265ac05222e1efd5e25"

  // ajax Request
  const xhr = new XMLHttpRequest()
  xhr.open("GET", searchString, true)
  xhr.onload = function() {
    const responseOject = JSON.parse(xhr.responseText)
    let characterVal = responseOject.data.count
    let searchHead = document.querySelector("h2")

    console.log(responseOject)
    if (characterVal > 0) {
      characterName = responseOject.data.results[0].name
      characterID = responseOject.data.results[0].id
      let characterImage = responseOject.data.results[0].thumbnail.path
      let imageX = responseOject.data.results[0].thumbnail.extension
      let charImaUrl = characterImage + "." + imageX
      searchHead.innerHTML = "Here are some comics from " + characterName
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
            // const { } = comicOject.data.results
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
  buttonSub.reset()
})

const hamMenus = document.querySelector("#menu")
const menulist = document.querySelector("#menulist")
console.log(hamMenus)
hamMenus.addEventListener("touchstart", function() {
  if (hamMenus.className == "navbuttonshow") {
    hamMenus.className = "showmenu"
    menulist.className = "showlist"
  } else {
    hamMenus.className = "navbuttonshow"
    menulist.className = "hidelist"
  }
})
