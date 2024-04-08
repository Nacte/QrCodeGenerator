const express = require('express');
const qr = require('qrcode');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up a simple form to take user input
app.get('/', (req, res) => {
  res.send(`
        <html>
            <head>
                <title>QR Code Generator</title>
            </head>
            <body>
                <h1>QR Code Generator</h1>
                <form action="/generate" method="get">
                    <label for="data">Enter Data:</label>
                    <input type="text" id="data" name="data">
                    <button type="submit">Generate QR Code</button>
                </form>
            </body>
        </html>
    `);
});

// Generate the QR code based on user input
app.get('/generate', (req, res) => {
  const data = req.query.data;
  if (!data) {
    res.send('Please provide data');
  } else {
    qr.toDataURL(data, (err, url) => {
      if (err) {
        res.send('Error generating QR code');
      } else {
        res.send(`
                    <html>
                        <head>
                            <title>Generated QR Code</title>
                        </head>
                        <body>
                            <h1>Generated QR Code</h1>
                            <img src="${url}">
                            <p>Data: ${data}</p>
                        </body>
                    </html>
                `);
      }
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
