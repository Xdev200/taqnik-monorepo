const fs = require('fs');
const path = require('path');

const vercelConfig = {
  "version": 2,
  "builds": [
    {
      "src": "dist/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/$1"
    },
    {
      "src": "/build-it",
      "dest": "dist/index.html"
    }
  ]
};

const vercelConfigPath = path.join(__dirname, '../dist/vercel.json');

try {
  fs.writeFileSync(vercelConfigPath, JSON.stringify(vercelConfig, null, 2));
  console.log('Successfully created vercel.json');
} catch (error) {
  console.error('Error creating vercel.json:', error);
  process.exit(1);
}