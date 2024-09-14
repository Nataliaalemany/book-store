## About the Project
This is a bookstore demo where I use the Google Books API to supply books and information about them. 

<img src="https://github.com/user-attachments/assets/1e8911b5-045d-4bad-85bb-b75fc35e6f28" height="350" />

## Built With
For this project I am using ReactJS and Typescript with TailwindCSS for styling.

## How to Run Project

1. Copy the repo
2. `npm install`
3. `npm start`

## Known Issues
Not all books returned from the API have a price, for that reason a random price is generated for each book. 

[There is a bug in the API](https://stackoverflow.com/questions/76799691/google-books-api-erroneously-incrementing-totalitems-returned
) where the total page count changes randomly on each page of results.
