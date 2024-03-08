const express = require("express");
const app = express();
const port = 3001;
const cors= require("cors")
const bodyParser = require("body-parser");
const chapter = require("./routes/pages.route");
const plan = require('./routes/plan')
const api=require("./controller/controller")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors())

app.use(chapter);
app.use(plan)
app.use('/api',api)


app.listen(port, () => {
	console.log("server connected");
});
