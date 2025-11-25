const express = require('express');
const app = express();
const port = process.env.PORT || 4500;
const path = require('path');
const hbs = require('hbs');

// public static path
app.set('view engine', 'hbs');
const template_path = path.join(__dirname, ("../templates/views"));
app.set('views', template_path);
const partials_path = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partials_path)
const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));

app.get("/", (req, resp) => {
    resp.render("index");     //over this, index.html run.
});

app.get("/about", (req, resp) => {
    resp.render("about");
});

app.get("/weather", (req, resp) => {
    resp.render("weather");
});

app.get(/(.*)/, (req, res) => {
    res.render("404error", {
        errorMsg: "Opps! Page Not Found"
    });
});


app.listen(port, () => {
    console.log(`listening to the port no. ${port}`);
});

//TYPE IN TERMINAL: "nodemon src/app.js -e js,hbs,html,css"