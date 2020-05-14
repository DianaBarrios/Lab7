const API_TOKEN = "2abbf7c3-245b-404f-9473-ade729ed4653";

function fetchBookmarks() {
  let url = '/bookmarks';
  let settings = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    }
  }

  fetch(url, settings)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJSON => {
        let results = document.querySelector(".results");
        console.log(responseJSON);
        results.innerHTML = "";
        for (let i = 0; i < responseJSON.length; i++) {
            results.innerHTML += `<div> ${responseJSON} </div>`;
        }
    })
    .catch(err => {
        results.innerHTML(err.message);
    });
}

function watchGetBookmarkForm() {
  let getBookmarkForm = document.querySelector(".get-bookmarks-form");
  getBookmarkForm.addEventListener("submit", event => {
    event.preventDefault();
    console.log("clicked button");
    fetchBookmarks();
  });
}

function init() {
  watchGetBookmarkForm();
}

init();
