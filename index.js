const express = require("express");
const app = express();
const port = 4000;
const path = require("path");
const logger = require("morgan")
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bearerToken = require('express-bearer-token');
const middleware = require("./middleware/auth");
const moment = require('moment');
const {errorLogger, errorResponder, invalidPathHandler} = require("./middleware/error");
const user = require('./models/user.model')
    

// __ db connection __ //
mongoose.connect('mongodb://localhost:27017/bootcamp',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


// __ __ routes __ __ //
const users = require("./routes/users");
const site = require("./routes/site");
const auth = require("./routes/auth");





app.use(express.static(path.join(__dirname, '/images')))
// app.use('/images',express.static(path.join(__dirname, '/images')))

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({origin: '*' }));

app.use("/site", site);
app.use("/auth", auth);

// __ Third party middleware __ //
app.use(bearerToken());
// __ Custom Middleware __ //
app.use(middleware.authenticate)
// __  Protected routes __ //

app.use("/v1/users", users);

app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);


console.log("path.join(__dirname, './build', 'index.html')", path.join(__dirname, './build', 'index.html'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

app.listen(port, function(){
	console.log(`Express app listening on port ${port}`)
})


