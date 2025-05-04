const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

// Use static files in EJS
app.use(express.static("public"));

//parse a form
app.use(express.urlencoded({extended: true}));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

var arr = []; //store blogs
var blogcount = 0; //store id of blogs

// Define a route
app.get("/", (req, res) => {
  res.render("index", { blogs: arr }); // You can pass data to the template here
});

// GET the view blog page
app.get("/viewblog/:id", (req, res) => { // id of the blog is sent in the url which can be used to open specific blog
  const id = parseInt(req.params.id);
  const blog = arr[id];
  res.render("viewblog", {blog: blog});
});

app.post("/submitblog", (req, res) => {

  var text = req.body.content;
  var obj = {
    id: blogcount,
    title: req.body.title,
    blog: text,
    subtext: text.substring(0, 10)
  };
  blogcount++;
  arr.push(obj);
  res.send(`
    <script>
      alert("Blog has been submitted");
      window.location.href = "/"; 
    </script>
  `);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
