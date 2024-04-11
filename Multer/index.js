// const express = require('express');
// const multer = require('multer');
// const app = express();
// const port = 4400;

// // const upload = multer({
// //    storage: multer.diskStorage({
// //        destination: function(req, file, cb) {
// //            cb(null, "uploads");
// //        },
// //        filename: function(req, file, cb) {
// //            cb(null, file.filename + "-" + Date.now() + ".jpeg");
// //        }
// //    })
// // }).single("user_file");

// // app.post('/upload', upload, (req, res) => {
// //     // Accessing the field name of the uploaded file
// //     console.log(req.filename);

// //     // Check if no file was uploaded
// //     if (!req.file) {
// //         return res.status(400).send('No file uploaded.');
// //     }
    
// //     res.send('File uploaded successfully.');
// // });

// const upload = multer({ dest: './public/data/uploads/' })
// app.post('/states', upload.single('uploaded_file'), function (req, res) {
//   // req.file is the name of your file in the form above, here 'uploaded_file'
//   // req.body will hold the text fields, if there were any 
//   console.log(req.file, req.body)
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is listening at http://localhost:${port}`);
// });

var express = require('express')
const app = express()
const multerfile = require('./multerfile')
const path=require('path')
var cors = require('cors')
app.use(express.json())
app.use(cors())



console.log("hello world")


app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    console.log('__dirname', path.join(__dirname));
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
// Serve the static files from the public folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api',multerfile)
app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500
    const errMessage=err.message||"something went wrong"
    res.status(`${errorStatus}`).send(`${errMessage}`)
    next();
 

})

app.listen(8000,()=>{
    console.log("runnig at port 8000")
})