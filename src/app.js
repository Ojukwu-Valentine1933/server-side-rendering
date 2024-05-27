const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

// Custom middleware to verify working hours
const workingTimeMiddleware = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  const hourOfDay = date.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.send(
      "The website is only available during working hours (Monday to Friday, 9:00 to 17:00)."
    );
  }
};

// declare public folder as an absolute path
app.use(express.static(path.join(__dirname, "..", "public")));

// Use the workingTimeMiddleware for all routes
app.use(workingTimeMiddleware);

// redirect to home route
app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// redirect to contacts route
app.get("/contacts", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "contact.html"));
});

//redirect to services route
app.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "services.html"));
});

//start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
