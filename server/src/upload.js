
var express = require('express')
const mkdirp = require('mkdirp');
var router = express.Router()

const multer = require('multer');
const path = require('path');

let storageDir = path.join(__dirname,"..","storage");
let storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      let dir = path.join(storageDir,req.headers.owner);
      mkdirp(dir, err => cb(err, dir))
       //cb(null, storageDir)
    },
    filename: (req, file, cb) => {
      console.log( Date.now() + "_" + path.extname(file.originalname));
      cb(null, path.basename(file.originalname))
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
  //console.log("recevied file",req.files);
  console.log(req.headers);
  return res.json({
    files: req.files
  });
})

router.get('/download/:userId/:id',(req, res) => {
  const fileId = req.params.id;
  const userId = req.params.userId;
  console.log(fileId,userId);
  let downloadPath = path.join(path.join(path.join(path.dirname(__dirname),"storage"),userId),fileId);
  console.log(downloadPath);
  res.download(downloadPath,function(err){
    if(err){
      res.send("could not find file");
    } else {
      console.log("success",path.join(path.dirname(__dirname),"storage"))
    }
  });
})


module.exports = router