const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const storage = require('node-persist');
const userRoutes = require('../routes/UserRoutes');

const app = express();

(async () => {
  await storage.init(); // init node-persist in async IIFE
})();

app.use(cors());
app.use(express.json());
app.use('/api/v1/user', userRoutes);

// Export Express app as a serverless function
module.exports = serverless(app);
