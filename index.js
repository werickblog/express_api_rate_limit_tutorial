const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

const port = process.env.PORT || 2300;

// API rate limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message:
      "Exceeded your allocated API calls, try again after a couple of minutes",
    api_calls_limit: 10,
    api_calls_renewal_time: "15 minutes"
  },
  statusCode: 429
});

// Enforse the rate limit middleware
app.use(apiLimiter);

app.get("/api/hello-world", (req, res) => {
  res.status(200).json({
    message: "Hello world! climate change is real"
  });
});

app.listen(port, err => {
  if (err) {
    console.log(`Server error due to ${err.message}`);
  }
  console.log(`Server running on port ${port}`);
});
