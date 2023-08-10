(()=>{

    class AppAux {



        static selectInputs(){
            let bookInput = document.querySelector("#book-input")
            let authorInput = document.querySelector("#author-input")
            let pagesInput = document.querySelector("#pages-input")
            let checkBox_1 = document.querySelector("#hasBeenRead_1")
            let checkBox_2 = document.querySelector("#hasBeenRead_2")
        
            return {bookInput, authorInput, pagesInput, checkBox_1, checkBox_2}
        }



        static checkInputs(){

            const inputs = AppAux.selectInputs();

            if (inputs.bookInput.value && inputs.authorInput.value && inputs.pagesInput.value && 
                (inputs.checkBox_1.checked || inputs.checkBox_2.checked)) {
                    return true
                } else{
                    return false
                }
        }
            

        static clearInputs(){

            const inputs = AppAux.selectInputs();

            // Clear input fields after adding a book
            inputs.bookInput.value = "";
            inputs.authorInput.value = "";
            inputs.pagesInput.value = "";
            inputs.checkBox_1.checked = false; // Set the checkbox to unchecked
            inputs.checkBox_2.checked = true; // Set the checkbox to unchecked
            
        }
        
    }





    class Library {

        constructor (booksArray){
            this.booksArray = booksArray
        }

        get books() {
            return this.booksArray;
        }

        findBook(index){
            return this.booksArray[index]
        }


        deleteBook(book_index){
            this.booksArray.splice(book_index,1)
        }


        //book is an instance of Book. Function to be used on the callback function for the button that submits the book
        insertBook(book){
            this.booksArray.push(book)

        }

        generateCard(book,index) {

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


        //Function to be called on submitButton

        addBookToLibrary(e) {
            
            e.preventDefault() 
        
            if (!AppAux.checkInputs()){
                alert ("Please enter all the information")
                return 
            }
            
            const inputs = AppAux.selectInputs();

            let newBook = new Book(inputs.bookInput.value, 
                inputs.authorInput.value, 
                inputs.pagesInput.value, 
                inputs.checkBox_1.checked
                )
        
            //Book is inserted
            this.insertBook(newBook)

            //Clearing input with AppAux static function
            AppAux.clearInputs()
        
            alert("The book has been saved!")
            this.ShowBooks()
            }


        //Needs to be run only once, just for the button on the main page
        addFeatureSubmitButton(){
            let submitButton = document.querySelector("#book-submit-btn")
            submitButton.addEventListener("click", this.addBookToLibrary.bind(this))
        }


        //This is run in every card of every book. Every card has a delete and a read status button. This functions
        //is used on ShowBooks, which renders all the books on the main page, that way when its rendered the buttons are added the event listener
        addFeaturesToButtons(book_index){
    
            let delete_button = document.querySelector(`.custom-delete-button_${book_index}`)
            delete_button.addEventListener("click", (e)=>{
                this.deleteBook(book_index)
                this.ShowBooks(myLibrary);
        
            })
            
            let read_status_button = document.querySelector(`.custom-read-button_${book_index}`)
            read_status_button.addEventListener("click", (e)=>{
                this.findBook(book_index).readChange()
                this.ShowBooks(myLibrary);
        
            })
        
        }

        //Books container is an empty div in the main page. We will generate all the book cards based in the books_array
        ShowBooks(){

            if (this.books.length === 0){
                console.log("showing nothing");
                return;
            }
            

            let books_container = document.querySelector("#books-container")
            //The div is cleaned first to prevent old records to be grouped
            books_container.innerHTML = ""
            this.books.forEach((book, index) => {
                //We create the outer div, a data attribute is being added to link it to the arrays index
                let new_div = document.createElement('div')
                new_div.setAttribute('data-book_index', index);
                let new_book_card = this.generateCard(book,index)
                new_div.innerHTML = new_book_card
                books_container.appendChild(new_div)
                this.addFeaturesToButtons(index)
            });
            
        }

    }


    class Book {

        constructor (name, author, pages, hasBeenRead){
            this.name = name;
            this.author = author;
            this.pages = pages;
            this._hasBeenRead = hasBeenRead;
        }

        set hasBeenRead(boolean){
            this._hasBeenRead = boolean
        }

        get hasBeenRead(){
            return this._hasBeenRead
        }
        
        
        info(){
            let message
            if (this.hasBeenRead){
                message = `You have read this book`
            }else{
                message = `You have not read this book yet.`
            }
            return `${this.name} was written by ${this.author}, it has ${this.pages} pages. ${message}`
        }
            
      
        readChange(){
            this.hasBeenRead= !this.hasBeenRead
        }

    
    }


    const myLibrary = new Library([])
    myLibrary.ShowBooks()
    myLibrary.addFeatureSubmitButton()



})()