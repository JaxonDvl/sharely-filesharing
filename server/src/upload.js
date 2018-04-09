
var express = require('express')
var router = express.Router()

const multer = require('multer');
const path = require('path');

let storageDir = path.join(__dirname,"..","storage");
let storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, storageDir)
    },
    filename: (req, file, cb) => {
      cb(null, Date.now()+path.extname(file.originalname))
    }
  })
const upload = multer({storage : storageConfig })



// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
router.post('/upload', upload.array("files"),(req, res) => {
  console.log("recevied file",req.files);
  return res.json({
    files: req.files
  });
})

module.exports = router