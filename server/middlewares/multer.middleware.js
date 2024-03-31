const multer = require ('multer');
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      // console.log("multer middle",file)
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const uniqueSuffix = Date.now() + path.extname(file.originalname)
      cb(null, file.fieldname + '_' + uniqueSuffix)
    }
  })
  
const upload = multer({ 
    storage: storage
 })

 module.exports=upload