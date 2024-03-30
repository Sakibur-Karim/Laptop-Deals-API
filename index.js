const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios').default.create({ // Create a new Axios instance with adjusted settings
  // Add these options if needed (consult documentation for details):
  // baseURL: 'https://api.example.com/', // Base URL for all requests (optional)
  // httpsAgent: agent // Custom https agent (optional)
});
const app = express();
const sources = [];

const urls = [
  {
    address: 'https://old.reddit.com/r/LaptopDeals/new/',
  },
];

// Use async/await for cleaner error handling
async function fetchDeals() {
  try {
    for (const urlObj of urls) {
      const response = await axios.get(urlObj.address);
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
    }
  } catch (error) {
    console.error("Error fetching deals:", error);
  }
}

// Call the fetchDeals function before serving requests
fetchDeals().then(() => {
  app.get('/', function (req, res) {
    res.json(sources);
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server opened at PORT ${PORT}`));
});