const PORT = process.env.PORT || 3000;
const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');
const app = express();
const sources = [];

const urls = [
  {
    address: 'https://old.reddit.com/r/LaptopDeals/new/',
  },
];

// Create an array of promises for each request
const requests = urls.map((url) => axios.get(url.address));

// Wait for all requests to complete
Promise.all(requests)
  .then((responses) => {
    responses.forEach((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $('a:contains("$")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr('href');
        sources.push({
          title,
          url,
        });
      });
    });

    // Start the server once all requests are processed
    app.listen(PORT, () => {
      console.log(`Server opened at PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error fetching data:', error.message);
  });

app.get('/', function (req, res) {
  res.json(sources);
});