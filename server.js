const express = require("express");
const app = express();
const multer = require("multer");
const storage = require('./config/cloudinary');
const Gallery = require("./model/Gallery");
const connectDB = require("./config/dbConnect");
connectDB();



//veiw engine
app.set("view engine", "ejs");

//static files
app.use(express.static("public"));


// configure multer to use cloudinary create instance of multer and pass the storage into it
const upload = multer({ storage });



// // configure multer
// // we assign the response coming from multer into upload
// const upload= multer({
// dest:'public/images',     // destination shows that in which folder we want to save the files
// // to upload only those files whose size is less than or equals to 1MB
// limits:{
//   fileSize:1000000,  // 1MB
// },
// // to upload only pdf or particular type of file
// fileFilter(req,file,cb){
//   // console.log(file);
// // we are accepting only img with .png

// if(file.originalname.endsWith('.jfif') || 
// file.originalname.endsWith('.png') || 
// file.originalname.endsWith('.jpeg')){
// // success
// cb(null,true);   /// here null means their is no any error  and true means everything is correct move to other middleware
// }else{
//   // error
// cb('please upload with extension .jfif',false);
// }

// },

// });






//GET /


app.get("/", (req, res) => {
  res.render("home");
});

//GET/ upload   to get the form for upload
app.get("/upload", (req, res) => {
  res.render("upload");
});


//POST /upload  make a request to upload on cloudinary
app.post("/upload", upload.single('file'), async (req, res) => {
  // console.log(req.file);     // this will give the details of uploaded file 

  // we want to save the url of uploaded file in mongodb
  const file = req.file.path;
  try {
    // pic is the saved images
    const pic = await Gallery.create({ name: file });
    console.log(pic);
    // after uploading we need to redirect the user to images page
    res.render("images");
  } catch (error) {
    res.send("something went wrong");
  }

  res.json('File uploaded successfully');
});




//GET /images   rendering images to the page
app.get("/images", async (req, res) => {
  //read all files in the uploads folder
  try {
    // make request to mongodb to fetch images from mongodb
    const images = await Gallery.find();
    console.log(images);
    res.render("images", { images });
  } catch (error) {
    res.send("something went wrong");
  }

});



// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
