
book_1 = new Book("Harry Potter 1", "JK Rowling", 500, true)
let myLibrary = [book_1];
let submitButton = document.querySelector("#book-submit-btn")



function Book(name, author, pages, hasBeenRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.hasBeenRead = hasBeenRead;
}

Book.prototype.info = function() {
    let message
    if (this.hasBeenRead){
        message = `You have read this book`
    }else{
        message = `You have not read this book yet.`
    }
    return `${this.name} was written by ${this.author}, it has ${this.pages} pages. ${message}`
}

Book.prototype.read_change = function(){
    this.hasBeenRead = !this.hasBeenRead
}


function generateCard(book, index) {
    return `

    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${book.name}</h5>
                    <p class="card-text">${book.info()}</p>
                </div>
            </div>

            <div class="col">
                <div class="card-body">
                    <button type="button" class="btn btn-primary mb-2 custom-button custom-delete-button_${index}">Delete</button>
                    <button type="button" class="btn btn-primary custom-button custom-read-button_${index}"> Read Status</button>  
                </div>
            </div>
        </div>
    </div>
    `;
  }


function ShowBooks(books_array){
    let books_container = document.querySelector("#books-container")
    books_container.innerHTML = ""
    books_array.forEach((book, index) => {
        //We create the outer div, a data attribute is being added to link it to the arrays index
        let new_div = document.createElement('div')
        new_div.setAttribute('data-book_index', index);
        let new_book_card = generateCard(book,index)
        new_div.innerHTML = new_book_card
        books_container.appendChild(new_div)
        addFeaturesToButtons(index)
    });
    
}



function checkInputs(){
    let bookInput = document.querySelector("#book-input")
    let authorInput = document.querySelector("#author-input")
    let pagesInput = document.querySelector("#pages-input")
    let checkBox_1 = document.querySelector("#hasBeenRead_1")
    let checkBox_2 = document.querySelector("#hasBeenRead_2")

  
    if (bookInput.value && authorInput.value && pagesInput.value && 
        (checkBox_1.checked || checkBox_2.checked)) {
            return true
        } else{
            return false
        }
}


function addBookToLibrary(e) {
    e.preventDefault() 

    if (!checkInputs()){
        alert ("Please enter all the information")
        return 
    }

    let bookInput = document.querySelector("#book-input")
    let authorInput = document.querySelector("#author-input")
    let pagesInput = document.querySelector("#pages-input")
    let checkBox_1 = document.querySelector("#hasBeenRead_1")
    let checkBox_2 = document.querySelector("#hasBeenRead_2")

    newBook = new Book(bookInput.value, 
        authorInput.value, 
        pagesInput.value, 
        checkBox_1.checked
        )

    myLibrary.push(newBook)
    
    // Clear input fields after adding a book
    bookInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    checkBox_1.checked = false; // Set the checkbox to unchecked
    checkBox_2.checked = true; // Set the checkbox to unchecked

    alert("The book has been saved!")
    ShowBooks(myLibrary)

 }




function addFeaturesToButtons(book_index){
 
    delete_button = document.querySelector(`.custom-delete-button_${book_index}`)
    delete_button.addEventListener("click", (e)=>{
        myLibrary.splice(book_index,1)
        ShowBooks(myLibrary);

    })
    
    read_status_button = document.querySelector(`.custom-read-button_${book_index}`)
    read_status_button.addEventListener("click", (e)=>{
        myLibrary[book_index].read_change()
        ShowBooks(myLibrary);

    })

}





submitButton.addEventListener("click", addBookToLibrary)



 
 //The books are shown
 ShowBooks(myLibrary)




 

