# Final Capstone Project
Part of the Build Your Brand tasks with HyperionDev. This repository looks at the website that I have built from scratch. This website contains articles and images which the user can 'save' to view later. Session storage is used, so users can refresh or others browse across the site without losing their favourites. The project is divided into sub-folders, each devoted to the css files, javascript files, html files and images.

## Contents
### Installation
### Usage
### Credits

## Installation
Download the capstoneWesbite folder to your local machine. To access the site, navigate to capstoneWebite/htmlFile and open the index.html file, running on your browser. The site will load and you will be able to navigate the site from there.

## Usage
The site is used primarly as a demonstration of the javascipt files used by the site. Namely, the 'save for later' button feature, which, when clicked by the user, will save the chosen content to a personal folder on a separate web page.

![Screenshot_1](https://user-images.githubusercontent.com/10632213/220694346-d203d07f-c20c-423a-8b50-d3678b14af43.png)

The 'like' or 'heart' button is chiefly an exercise in CSS. No information is stored regarding this button, so on refresh the information is lost. The frameworks for implementing this, however, are set for any future development.

![Screenshot_2](https://user-images.githubusercontent.com/10632213/220695633-b26e8c1d-7e19-4b46-80d7-4b798ac4d5ae.png)

Both articles and images have the option to be saved. Once saved, when the user visits the 'My Personal Folder' / 'Saved for Later' page, a script is called to create html elements based on what the user has liked. The javascript builds a list of hyperlinks, which link the user back to whichever image or article they liked.

![Screenshot_4](https://user-images.githubusercontent.com/10632213/220697281-3c364e6d-2617-4248-b709-e0ee26ac9452.png)

Whenever an item is 'saved' there is a separate counter tracking how many items have been saved, which is shown to the user each time they add something else.

![Screenshot_3](https://user-images.githubusercontent.com/10632213/220697667-9198fecc-9abc-4d10-9e20-d3d5b732626d.png)

Similarly, the list of saved items is checked for duplicates and lets the user know if they've tried to add the same thing twice, even having clicked away.

![Screenshot_5](https://user-images.githubusercontent.com/10632213/220697783-5fbf8f53-66db-4ddb-b0bc-dea3909b6f54.png)

## Credits
This project was made by me and with the tuition at [HyperionDev](https://www.hyperiondev.com/). CSS for this project was minimal and can be built upon. The javascript is much more comprehensive but can be built upon if desired.