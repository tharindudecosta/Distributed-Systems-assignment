const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //destination of content storage
        cb(null, './uploads/lectures/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/zip' ||
        file.mimetype === 'video/mp4' ||
        file.mimetype === 'video/webm' ||
        file.mimetype === 'video/3gpp'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 500
    },
    fileFilter: fileFilter 
})

module.exports = upload
