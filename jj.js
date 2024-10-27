
console.log("hello");


const xhrSearchBtn = document. getElementById ("xhrSearch") 


   xhrSearchBtn.addEventListener("click", searchUsingXHR)
 const fetchSearchBtn = document.getElementById("fetchSearch")

fetchSearchBtn. addEventListener("click", searchUsingFetchPromises)

const fetchAsyncAwaitBtn = document.getElementById("fetchAsyncAwaitSearch")

  fetchAsyncAwaitBtn.addEventListener("click", searchUsingFetchAsyncAwait);


const searchQuery = document.getElementById("queryInput")
const API_URL = "https://api.unsplash.com/search/photos";

  let ACCESS_KEY="YH9XCkzxvtEMtmkxv2G96B8GRdKkCavdl6N5YQMeRFc";


function searchUsingXHR() {
    let queryTerm = searchQuery.value.trim();
    const xhr = new XMLHttpRequest();
     xhr.open("GET", API_URL + "?query=" + queryTerm);
    xhr.setRequestHeader("Authorization", "Client-ID " + ACCESS_KEY);
 xhr.onreadystatechange = () => {
    
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("success");
             let responseText = xhr.responseText;
              let responseObj = JSON.parse(responseText);
             createImages(responseObj);
         }
    };
     xhr.send();
}

async function searchUsingFetchAsyncAwait() {
 let queryTerm = searchQuery.value.trim();
     let response = await fetch(API_URL + "?query=" + queryTerm, {
        method: "GET",
        headers: {
            "Authorization": "Client-ID " + ACCESS_KEY
        }
     });

    if (response.ok) {
        const responseObj = await response.json();
       console.log(responseObj);
        createImages(responseObj);
    }
}



function searchUsingFetchPromises() {
  let queryTerm = searchQuery.value.trim();
    
    fetch(API_URL + "?query=" + queryTerm, {
        method: "GET",
         headers: {
            "Authorization": "Client-ID " + ACCESS_KEY
        }

    })
    .then(response => {
        return response.json();

    })
    .then(data => {
        createImages(data);

    });
}


    
function createImages(data) {

    const resultsElem = document.getElementById("results");
    resultsElem.innerHTML = ""; 
   

    for (let item of data.results) {
        let imgElem = document.createElement("img");
        imgElem.src = item.urls.small;
        imgElem.alt = item.alt_description || 'Image'; 

        resultsElem.appendChild(imgElem);
    }
}