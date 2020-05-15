const API_TOKEN = "2abbf7c3-245b-404f-9473-ade729ed4653";

function fetchBookmarks() {
  let url = "/bookmarks";
  let settings = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`
    }
  };

  let results = document.querySelector(".results");

  fetch(url, settings)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJSON => {
      results.innerHTML = "";
      for (let i = 0; i < responseJSON.length; i++) {
        results.innerHTML += `<div id="${responseJSON[i].id}"> 
            <h3> ${responseJSON[i].title}</h3>
            <ul>
              <li>ID: ${responseJSON[i].id} </li>  
              <li>Title: ${responseJSON[i].title} </li>
              <li>Description: ${responseJSON[i].description} </li>
              <li>URL: ${responseJSON[i].url} </li>
              <li>Rating: ${responseJSON[i].rating} </li>
            </ul>
            </div>`;
      }
    })
    .catch(err => {
      results.innerHTML = `<div><h4>Error: ${err.message} <h4></div>`;
    });
}

function fetchGetBookmarkByTitle(title) {
  let url = `/bookmark?title=${title}`;

  let settings = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`
    }
  };

  let results = document.querySelector(".results");

  fetch(url, settings)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJSON => {
      results.innerHTML = "";
      for (let i = 0; i < responseJSON.length; i++) {
        results.innerHTML += `<div id="${responseJSON[i].id}"> 
        <h3> ${responseJSON[i].title}</h3>
        <ul>
          <li>ID: ${responseJSON[i].id} </li>  
          <li>Title: ${responseJSON[i].title} </li>
          <li>Description: ${responseJSON[i].description} </li>
          <li>URL: ${responseJSON[i].url} </li>
          <li>Rating: ${responseJSON[i].rating} </li>
        </ul>
        </div>`;
      }
    })
    .catch(err => {
      results.innerHTML = `<div><h4>Error: ${err.message} <h4></div>`;
    });
}

function fetchCreateBookmark(title, description, link, rating) {
  let url = "/bookmarks";

  let data = {
    title: title,
    description: description,
    url: link,
    rating: Number(rating)
  };

  let settings = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  let results = document.querySelector(".results");

  fetch(url, settings)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJSON => {
      fetchBookmarks();
      /*
      let newBookmark = `<div id="${responseJSON.id}"> 
        <h3> ${responseJSON.title}</h3>
        <ul>
          <li>ID: ${responseJSON.id} </li>  
          <li>Title: ${responseJSON.title} </li>
          <li>Description: ${responseJSON.description} </li>
          <li>URL: ${responseJSON.url} </li>
          <li>Rating: ${responseJSON.rating} </li>
        </ul>
        </div>`;
      results.innerHTML += newBookmark;*/
    })
    .catch(err => {
      results.innerHTML = `<div><h4>Error: ${err.message} <h4></div>`;
    });
}

function fetchDeleteBookmark(id) {
  let url = `/bookmark/${id}`;

  let settings = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`
    }
  };

  let results = document.querySelector(".results");

  fetch(url, settings)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJSON => {
      fetchBookmarks();
      /*$(`#${id}`).remove();
      */
    })
    .catch(err => {
      results.innerHTML = `<div><h4>Error: ${err.message} <h4></div>`;
    });
}

function fetchUpdateBookmark(id, title, description, link, rating) {
  let url = `/bookmark/${id}`;

  let data = {
    id: id,
    title: title,
    description: description,
    url: link,
    rating: Number(rating)
  };

  let settings = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  let results = document.querySelector(".results");

  fetch(url, settings)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJSON => {
      fetchBookmarks();
    })
    .catch(err => {
      results.innerHTML = `<div><h4>Error: ${err.message} <h4></div>`;
    });
}

function watchGetBookmarksForm() {
  let form = document.querySelector(".get-bookmarks-form");
  form.addEventListener("submit", event => {
    event.preventDefault();
    fetchBookmarks();
  });
}

function watchGetBookmarkByTitleForm() {
  let form = document.querySelector(".get-bookmark-by-title-form");
  form.addEventListener("submit", event => {
    event.preventDefault();
    let title = document.getElementById("bookmarkTitle").value;
    form.reset(); 
    fetchGetBookmarkByTitle(title);
  });
}

function watchCreateBookmarkForm() {
  let form = document.querySelector(".add-bookmark-form");
  form.addEventListener("submit", event => {
    event.preventDefault();
    let title = document.getElementById("newBookmarkTitle").value;
    let description = document.getElementById("newBookmarkDescription").value;
    let url = document.getElementById("newBookmarkurl").value;
    let rating = document.getElementById("newBookmarkRating").value;
    form.reset();
    fetchCreateBookmark(title, description, url, rating);
  });
}

function watchDeleteBookmarkForm() {
  let form = document.querySelector(".delete-bookmark-form");
  form.addEventListener("submit", event => {
    console.log("deleting");
    event.preventDefault();
    let id = document.getElementById("deleteBookmarkID").value;
    form.reset();
    fetchDeleteBookmark(id);
  });
}

function watchUpdateBookmarkForm() {
  let form = document.querySelector(".update-bookmark-form");
  form.addEventListener("submit", event => {
    event.preventDefault();
    let id = document.getElementById("updateBookmarkID").value;
    let title = document.getElementById("updateBookmarkTitle").value;
    let description = document.getElementById("updateBookmarkDescription").value;
    let url = document.getElementById("updateBookmarkURL").value;
    let rating = document.getElementById("updateBookmarkRating").value;
    form.reset();
    fetchUpdateBookmark(id, title, description, url, rating);
  });
}

function init() {
  fetchBookmarks();
  watchGetBookmarkByTitleForm();
  watchCreateBookmarkForm();
  watchDeleteBookmarkForm();
  watchUpdateBookmarkForm();
}

init();
