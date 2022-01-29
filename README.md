# Latest-Laptop-Deals-API

This is an API I made out of curiosity, as I love (gaming) laptops and even browsing for them makes me happy. I deployed the program using Heroku and then publicly hosted at RapidAPI.com.

Link to API at RapidAPI.com: https://rapidapi.com/Sakibur-Karim/api/latest-laptop-deals/

## How to run the program

- Clone the repository
- Install the dependencies using this command<br />
<pre>npm i</pre>
- Run using this command<br />
<pre>npm start nodemon</pre>

## Tools & Technologies

- JavaScript
- Node.js
- Express.js
- Axios.js
- Cheerio.js
- Heroku
- RapidAPI
- Git/GitHub

## How it looks:
![image](https://user-images.githubusercontent.com/58964916/150865654-eeda2ba1-452a-41aa-bf6e-73f6a3ea7327.png)

## What is it and how it works:

This API will extract laptop deals currently available around the internet (via Reddit). It scrapes the HTML links and extracts the links using Cheerio.js. Node.js, Express.js & Axios.js works as the backend for the scraping. Whether you are looking for a general use laptop, productivity or gaming laptop, this API can save you hundreds of dollars and help you find your next favorite laptop!