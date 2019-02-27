const express    = require("express"),
      hbs        = require("hbs");

// *********** //
// App Config  //
// *********** //

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(__dirname + "/public"));
app.set("view engine", "hbs");

// Server our single page
app.get("/", (req, res) => {
    res.render("index");
});

app.listen(port, () => {
    console.log("Words server up and running....");
});