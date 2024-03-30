const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const redditUrl = 'https://old.reddit.com/r/LaptopDeals/new/';

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