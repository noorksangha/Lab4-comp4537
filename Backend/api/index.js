// Replace 'http' and 'url' module usage with Vercel's serverless function model
const url = require('url');

let requestCount = 0;
const dictionary = [];

module.exports = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const word = parsedUrl.query.word;
  requestCount++;

  // Set CORS headers
module.exports = (req, res) => {
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    // Handle OPTIONS request for CORS preflight
    res.writeHead(200);
    res.end();
    return;
  }

  // Rest of your logic...

  // Logic remains mostly unchanged
  if (req.method === 'POST' && parsedUrl.pathname === '/api/definitions') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const entry = JSON.parse(body);
      const existingEntry = dictionary.find((item) => item.word === entry.word);
      if (existingEntry) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `Warning! '${entry.word}' already exists.`, requestCount, totalEntries: dictionary.length }));
      } else {
        dictionary.push(entry);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `New entry recorded: "${entry.word} : ${entry.definition}"`, requestCount, totalEntries: dictionary.length }));
      }
    });
  } else if (req.method === 'GET' && parsedUrl.pathname === '/api/definitions/') {
    const definition = dictionary.find(item => item.word === word);
    if (definition) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ word: definition.word, definition: definition.definition, requestCount }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `Request# ${requestCount}, word '${word}' not found!`, requestCount }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
};
