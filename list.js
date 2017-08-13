// load page first
window.addEventListener("load", () => {
  if (localStorage.getItem("lastSearchedItem")) {
    lastView()
  }

  // get search results
  const comicClear = document.querySelector(".comicList")
  const buttonSub = document.querySelector("form")
  buttonSub.addEventListener("submit", e => {
    comicClear.innerHTML = ""
    e.preventDefault()
    loadData()
    buttonSub.reset()
  })

  // hamburger menu
  const mainhead = document.querySelector("#fullhead")
  const hamMenus = document.querySelector("#menu")
  const menulist = document.querySelector("#menulist")
  hamMenus.addEventListener("touchstart", () => {
    if (hamMenus.className == "navbuttonshow") {
      hamMenus.className = "showmenu"
      menulist.className = "showlist"
      mainhead.className = "teambackmenu"
    } else {
      hamMenus.className = "navbuttonshow"
      menulist.className = "hidelist"
      mainhead.className = "teamback"
    }
  })
})

// API Marvel Request
function loadData() {
  const searchSec = document.querySelector(".comicList")
  const input = encodeURI(document.querySelector("input").value)
  let searchString =
    "https://gateway.marvel.com:443/v1/public/characters?name=" +
    input +
    "&apikey=ee1f0c547b636265ac05222e1efd5e25"

  // First API Marvel Request (character id)
  const xhr = new XMLHttpRequest()
  xhr.open("GET", searchString, true)
  xhr.onload = () => {
    const responseOject = JSON.parse(xhr.responseText)
    let searchHead = document.querySelector("h2")
    console.log(responseOject)

    if (responseOject.data.count > 0) {
      const { name, id } = responseOject.data.results[0]
      searchHead.innerHTML = "Here are some comics from " + name
      comicPop(id, searchSec)

      searchSec.insertAdjacentHTML(
        "afterend",
        '<p id="marvellink"><a href="https://www.marvel.com">View more at Marvel</a></p>'
      )
    } else {
      searchHead.innerHTML = "Not a Marvel character, please try again!"
      searchSec.insertAdjacentHTML(
        "afterbegin",
        "<img id='failPic' class='failClass' src='./images/marvelgame_over.png'>"
      )
    }
  }
  xhr.send(null)
}

// populate characters comics for search input
function comicPop(a, b) {
  let id = a
  let searchSec = b
  let comicString =
    "https://gateway.marvel.com:443/v1/public/characters/" +
    id +
    "/comics?apikey=ee1f0c547b636265ac05222e1efd5e25"
  // Second API Marvel Request (comics)
  let comicXHR = new XMLHttpRequest()
  comicXHR.open("GET", comicString, true)
  comicXHR.onload = () => {
    console.log(comicXHR)
    localStorage.setItem("lastSearchedItem", comicXHR.responseText)
    lastView()
  }
  comicXHR.send(null)
}
// populate comics from localStorage
function lastView() {
  const last = document.querySelector(".comicList")
  let comicOject = JSON.parse(localStorage.getItem("lastSearchedItem"))
  comicOject.data.results.forEach(comics1 => {
    const { thumbnail, title, urls } = comics1
    let comicImaUrl = thumbnail.path + "." + thumbnail.extension
    let comicInsert =
      "<li><img src=" +
      comicImaUrl +
      ' ><a href="' +
      urls[0].url +
      '">' +
      title +
      "</a></li>"
    last.insertAdjacentHTML("afterbegin", comicInsert)
  })
}
