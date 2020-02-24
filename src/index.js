console.log('%c HI', 'color: firebrick')

const imageContainer = document.getElementById('dog-image-container');
const breedsList = document.getElementById('dog-breeds');
const dropdown = document.getElementById('breed-dropdown');
let breeds

function fetchImages(){
    fetch('https://dog.ceo/api/breeds/image/random/4').then(function(response) {
       return response.json();
   }).then(function(json) {
       addImages(json);
   });
}

function addImages(json){
    for (const element of json.message) {
       let img = document.createElement("img");
       img.setAttribute("src", element);
       imageContainer.append(img);
    }
}

function fetchBreeds(){
    fetch('https://dog.ceo/api/breeds/list/all').then(function(response) {
        return response.json();
    }).then(function(json) {
        breeds = json.message
        addBreeds(json);
    });
}

function addBreeds(json){
    for (const key in breeds){
        let breed = document.createElement('li')
        breed.innerText = key
        breedsList.append(breed);
    }
}


fetchImages()
fetchBreeds()

breedsList.addEventListener('click', function(e) {
    if (e.target.tagName === "LI") {
        e.target.style.color = "blue"
    }
})

// dropdown.addEventListener('change', function(e) {
//     let selection = e.target.value
//     for (const element of breedsList.children) {
//         if(!(element.innerText.startsWith(selection))) {
//             element.remove()
//         }
//     }  
// })


dropdown.addEventListener('change', function(e) {
    let selection = e.target.value
    let newList = ""
    for (const key in breeds){
        if(key[0] == selection) {
            newList += `<li>${key}</li>`
        }
    }
    breedsList.innerHTML = newList;
})