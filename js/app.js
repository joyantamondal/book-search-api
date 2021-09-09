
document.getElementById("search-result").style.display = "none";
// book details display from here
const displayBook = (books) => {
  document.getElementById("search-result").style.display = "none";
  const bookList = document.getElementById("book-list");
  bookList.textContent = "";
  if (books.length > 0) {
    document.getElementById("search-result").style.display = "block";
    document.getElementById(
      "search-result"
    ).innerText = `Found ${books.length} Books`;
  }
  if (books.length === 0) {
    document.getElementById("error-message").style.display = "block";
  }
  else{
  books?.forEach((book) => {
    const div = document.createElement("div");
    div.innerHTML = ` 
        <div class="col">
        <div class="card w-100 h-100">
            <img src="https://covers.openlibrary.org/b/id/${
              book.cover_i
            }-M.jpg" class="card-img-top w-50 mx-auto"
                alt="Book Photo">
            <div class="card-body">
               
            <table class="table table-bordered">
            <thead>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Book Name</th>
                <td>${book.title ? book.title : "Not Available"}</td>
              </tr>
              <tr>
                <th scope="row">Author</th>
                <td id="author">${
                  book.author_name ? book.author_name : "Not Available"
                }</td>
              </tr>
              <tr>
                <th scope="row">First Publish Date</th>
                <td id="first-publish-date">${
                  book.first_publish_year
                    ? book.first_publish_year
                    : "Not Available"
                }</td>
              </tr>
              <tr>
                <th scope="row">Publisher</th>
                <td>${book.publisher ? book.publisher : "Not Available"}</td>
              </tr>
            </tbody>
          </table>
                 
                <!-- table end -->
            </div>
        </div>
    </div>
        `;
    bookList.appendChild(div);
  });
}
  //  hide spinner
  toggleSpinner("none");
};

// spinner
const toggleSpinner = (displayStyle) => {
  document.getElementById("spinner").style.display = displayStyle;
};

// book details search from here
const searchBook = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  // hide search result not foundd
  document.getElementById("error-message").style.display = "none";

  //display Spinner
  toggleSpinner("block");

  // books result clear
  document.getElementById("book-list").textContent ='';
  
  //hide book count
  document.getElementById("search-result").style.display = "none";
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayBook(data.docs));
};
