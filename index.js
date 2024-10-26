const express = require('express');
const axios = require('axios');

const app = express();

// Define Reddit API URL
const redditUrl = 'https://www.reddit.com/r/LaptopDeals/new.json';

// Define middleware to set CORS headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// Define route to fetch data from Reddit
app.get('/', async (req, res) => {
    try {
        const response = await axios.get(redditUrl);
        const posts = response.data.data.children.map(child => ({
            header: child.data.title,
            link: child.data.url
        }));
        res.json(posts);
    } catch (error) {
        console.error('Error fetching Reddit data:', error.message);
        res.status(500).json({ error: 'Failed to fetch Reddit data' });
    }
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
