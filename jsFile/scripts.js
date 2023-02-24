// scripts for my website

// console.log('Hello!')

// this is our 'main' function, set to load on all webpages (except the userSaved page), and bringing with it all the saved state information
function siteLoaded(){

    // we check if the user has been here before
    // if so, we also create a new variable, folderConter to 0, which will track the number of articles and images saved by the user,
    // alongside the actual content itself
    if (sessionStorage.getItem("hasCodeRunBefore") === null) {
        let savedFolder = [];
        let folderCounter = 0;
        sessionStorage.setItem("savedContent", JSON.stringify(savedFolder));
        sessionStorage.setItem("counter", JSON.stringify(folderCounter));
        sessionStorage.setItem("hasCodeRunBefore", true);
        console.log("You're new here!");
    } 
    // otherwise, the user has been here before, and we recall the JSON data using parse (converting the string back to our code)
    else {
        savedFolder = JSON.parse(sessionStorage.getItem("savedContent"));
        folderCounter = JSON.parse(sessionStorage.getItem("counter"));
        console.log("You've been here before!");
        console.log(`Your folder has ${folderCounter} things saved in it.`);
    };

    // we select all HTML elements under the 'article' tag, and create an array of this information
    let articles = document.querySelectorAll('article');
    let articlesArray = [];

    // using the for loop below, we then add the buttons (save and like) for each article, and set up event listeners
    for (i = 0 ; i < articles.length; i++){

        articlesArray.push(articles[i].innerText);
        let articleSpan = document.createElement('span');
        let articleButton = document.createElement('button');
        articleButton.classList = "saveButton";
        articleButton.innerHTML = "Save for later";
        let articleLike = document.createElement('button');
        articleLike.id = "likeButton";
        articleLike.classList = "unliked";
        articleLike.innerHTML = "\u2665";
        articles[i].appendChild(articleSpan);
        articleSpan.appendChild(articleButton);
        articleSpan.appendChild(articleLike);

        // on clicking on the like button, we send this information to the clickedLike function
        articleLike.addEventListener('click', (e) => {
            clickedLike(e);
        })

        // on clicking the 'save for later' button, we send this information to the clickedSelection function
        articleButton.addEventListener('click', (e) => {
            clickedSection(e);
        })
    }

    // we repeat the same steps for the images, tweaking some of the steps
    let images = document.querySelectorAll('img');
    let imagesArray = [];


    for (i = 0 ; i < images.length; i++){

        // the key difference is we're saving the src of each image
        imagesArray.push(images[i].src);
        let imageSpan = document.createElement('span');
        let imageButton = document.createElement('button');
        imageButton.classList = "saveButton";
        imageButton.innerHTML = "Save image for later";
        let imageLike = document.createElement('button');
        imageLike.id = "likeButton";
        imageLike.classList = "unliked";
        imageLike.innerHTML = "\u2665";
        images[i].insertAdjacentElement("afterend", imageSpan);
        imageSpan.appendChild(imageButton);
        imageSpan.appendChild(imageLike);

        imageLike.addEventListener('click', (e) => {
            clickedLike(e);
        });

        imageButton.addEventListener('click', (e) => {
            clickedImage(e);
        });
    }
}


function clickedSection(e){

    // we load our JSON info
    savedFolder = JSON.parse(sessionStorage.getItem("savedContent"));
    folderCounter = JSON.parse(sessionStorage.getItem("counter"));

    // we set up a boolean, assuming that the item that has been clicked is 'new' to the user
    let newItem = true;

    // this function will save the clicked article as a hyperlink
    // whilst it is the button that has been clicked, we can navigate through the DOM get to, and construct the full URL and # that will locate
    // the articles specific location on that page
    let clickedItem = e.target.parentElement.parentElement.baseURI + "#" + e.target.parentElement.parentElement.id;

    // one issue with the above method was users visiting their saved links and then from that URL, saving new articles
    // this would not recognise previously saved articles, as the additional #previouslyClickedLink would create a new, unique URL
    // so in this if statement, we check if the clicked element has two instances of #. If it does, then we remove the first instance
    // i.e. mySite#firstReference#secondReference becomes mySite#secondReference
    if(clickedItem.indexOf('#', clickedItem.indexOf('#')+1) != -1){
            //index = savedFolder[i].indexOf('#', (savedFolder[i].indexOf('#'))+1);
            index1 = clickedItem.indexOf('#', clickedItem.indexOf('#')+1);
            // console.log(index1);
            index2 = clickedItem.indexOf('#');
            // console.log(index2);
            let clickedItem1 = clickedItem.slice(index1);
            // console.log(clickedItem1);
            let clickedItem2 = clickedItem.slice(0, index2);
            // console.log(clickedItem2);
            clickedItem = clickedItem2+clickedItem1;
            console.log("We detected a double #")
            // console.log(clickedItem);
        }

    console.log(`We converted this to ${clickedItem}`);

    // we run through the saved folder and see if we've already got a saved instance of the article the user wants to save
    for(i = 0; i < savedFolder.length; i++){

        console.log(`Does 
        ${clickedItem}
        =
        ${savedFolder[i]}`)

        if(clickedItem == savedFolder[i]){
            alert(`
            You've already saved this to your favourites.
            You still have ${folderCounter} items in your favourites.`);
            // we then mark that the newItem is NOT new!
            newItem = false;
        }
    }

    // if the saved item is unique, we then increase the folder counter and add the article to our array
    // we then save the JSON info
    if(newItem == true){
        
        folderCounter++;
        savedFolder.push(clickedItem);

        alert(`
        Added this to your favourites.
        You now have ${folderCounter} items in your folder.`)

        sessionStorage.setItem("savedContent", JSON.stringify(savedFolder));
        sessionStorage.setItem("counter", JSON.stringify(folderCounter));
    }
}

function clickedImage(e){

    //this runs the same as clickedSelection, only with different (and easier) DOM manipulation
    // here, we save the URL, allowing the user to click on the URL to see the standalone image in their personal folder

    savedFolder = JSON.parse(sessionStorage.getItem("savedContent"));
    folderCounter = JSON.parse(sessionStorage.getItem("counter"));

    let newItem = true;
    //console.log(e.target.parentElement.previousSibling.src);

    let clickedItem = e.target.parentElement.previousSibling.src;

    for(i = 0; i < savedFolder.length; i++){

        console.log(`Does 
        ${clickedItem}
        =
        ${savedFolder[i]}`)

        if(clickedItem == savedFolder[i]){
            alert(`
            You've already saved this to your favourites.
            You still have ${folderCounter} item(s) in your favourites.`);
            newItem = false;
        }
    }

    if(newItem == true){
        
        folderCounter++;
        savedFolder.push(clickedItem);

        alert(`
        Added this to your favourites.
        You now have ${folderCounter} item(s) in your folder.`)

        sessionStorage.setItem("savedContent", JSON.stringify(savedFolder));
        sessionStorage.setItem("counter", JSON.stringify(folderCounter));
    }
}
    
// this is a simple toggle function, with the liked and unliked classes styled in our CSS stylesheet
function clickedLike(e){
        e.target.classList.toggle('liked');
        e.target.classList.toggle('unliked');
}

// this function loads when the user goes to the userSaved html page
function myFavourites(){
    // we load our JSON data
    savedFolder = JSON.parse(sessionStorage.getItem("savedContent"));
    folderCounter = JSON.parse(sessionStorage.getItem("counter"));

    console.log("Welome to your favourites folder!")

    // the user has indeed saved anything, we then create instances for each saved item,
    // building hyperlinks allowing the user to return to those that they've saved
    if(folderCounter > 0){

        let folderId = document.querySelector('#folderId');


        for(i = 0; i < savedFolder.length; i++){
            // we create a list element for each instance of saved items and then build a hyperlink back to it
            let myList = document.createElement('li');
            myList.classList = "favouritesList";
            let myHyperlink = document.createElement('p')

            // as this is a combination of article and image formats,
            // we setup an if statement to check, which can be done simply by looking for the '#' character
            // this protocol would therefore require that all images added do not have the '#' symbol
            // if we were to start adding images saved with the '#' in their src, then we would adapt the information below accordingly
            // thankfully we don't need to on this site at this time!
            if(savedFolder[i].indexOf('#') != -1){
                index = savedFolder[i].indexOf('#');
                console.log("We found a #!");
                myHyperlink.innerText = (i+1)+". "+savedFolder[i].slice(index+1);
                myHyperlink.innerHTML = '<a href = "'+savedFolder[i]+'">'+myHyperlink.innerText+'</a>'
            }
            else{
                index = savedFolder[i].indexOf('imagesFile/');
                myHyperlink.innerText = (i+1)+". "+savedFolder[i].slice(index+11);
                myHyperlink.innerHTML = '<a href = "'+savedFolder[i]+'">'+myHyperlink.innerText+'</a>'                
            }

            console.log(`${savedFolder[i]}`);
            myList.appendChild(myHyperlink);    
            folderId.appendChild(myList);
        }
    }
}

// this is activiated when the user clicked on the 'submit a comment' button on the main (index) page
function commentForm(){      

    // we select the input box and the radio buttons
    let comment = document.getElementById("userComment").value;
    let radioButtons = document.querySelectorAll('input[name="storyType"]');

    // we then run through the radio buttons to see which one the user chose
    let selectedItem = "";
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedItem = radioButton.value;
            break;
        }
    }

    let message = selectedItem;

    // we do some validation to check the user has actually written something and check they've actually selected one of the radio buttons
    if(comment == ""){
        alert(`You need to enter something in the comment box.`);
    }
    else if(message == ""){
        alert(`You haven't selected any of the story options.`);
    }
    else{
        alert(`You submitted the comment: "${comment}" 
        And your favourite story type is '${selectedItem}'.
        A fine choice!`);
        document.getElementById("userComment").value = "";
    }

}

// this is activated when the user hits 'notify me' on the succession.html page
function contactForm(){

    // we obtain the text (value) from the input boxes for name and email
    let userName = document.getElementById("userName").value;
    let userEmail = document.getElementById("userEmail").value;

    // we do some validation to check there are no empty entries
    if(userEmail == "" || userName == ""){
        alert(`You didn't fill in info in all the boxes.`);
    }
    else{
        alert(`Your details were submitted, ${userName}, you'll be contacted shortly!`);
        document.getElementById("userName").value = "";
        document.getElementById("userEmail").value = "";
    }

}