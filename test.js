const express = require('express');
const app = express();
// Define the first API endpoint
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hi severy ' });
});
app.listen(3000, function() {
    console.log('Listening on port 3000');
    console.log('sssssssss');
});