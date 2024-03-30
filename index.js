const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const redditUrl = 'https://www.reddit.com/r/LaptopDeals/';
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://old.reddit.com/r/LaptopDeals/new/"); // Replace "*" with your specific allowed origins
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get('/', async (req, res) => {
    try {
        // Fetch the Reddit page
        const response = await axios.get(redditUrl);
        const html = response.data;

        // Parse the HTML using Cheerio
        const $ = cheerio.load(html);

        // Extract post titles and links
        const posts = [];
        $('.thing').each((index, element) => {
            const title = $(element).find('.title').text().trim();
            const link = $(element).find('.title a').attr('href');
            posts.push({ title, link });
        });

        // Send the extracted data as JSON
        res.json(posts);
    } catch (error) {
        console.error('Error fetching Reddit page:', error.message);
        res.status(500).json({ error: 'Failed to fetch Reddit data' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});