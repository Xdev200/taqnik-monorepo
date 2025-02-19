// scripts/create-vercel-json.js
const fs = require('fs');
const path = require('path');

const vercelConfig = {

  rewrites: [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
};

const filePath = path.join(__dirname, '..', 'vercel.json');
fs.writeFileSync(filePath, JSON.stringify(vercelConfig, null, 2));
console.log("vercel.json file created successfully at", filePath);
