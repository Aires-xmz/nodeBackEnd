const path = require('path')
const multer = require('multer')
const fs = require('fs')
/*const upload = multer({
    dest:path.resolve(__dirname,'../public/uploads')
})*/
const randomstring = require('randomstring')

let filename = ''
const mimetypeMap = {
    "image/png": ".png",
    "image/jpg": ".jpg",
    "image/jpeg": ".jpeg",
    "image/gif": "gif"
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../public/uploads'))
    },
    filename: function (req, file, cb) {
        let {
            fieldname,
            mimetype
        } = file
        filename = fieldname + '-' + randomstring.generate(6) + mimetypeMap[mimetype]
        cb(null, filename)
    }
})

const upload = multer({
    storage
}).single('pic')

/*module.exports = ((req,res,next) =>{
    return upload.single('pic')
})()*/

module.exports = (req, res, next) => {
    upload(req, res, (err) => {
        req.body.pic = filename
        if (filename) {
            fs.unlink(path.resolve(__dirname, '../public/uploads/' + req.body.tempPic), (err) => {
                if (err) {
                    console.log(err.message)
                }
            })
        }
        filename = ''
        next()
    })
}