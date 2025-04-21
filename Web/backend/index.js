const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Movie Platform Backend is running on Render!');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
