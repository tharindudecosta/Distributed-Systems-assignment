const multer = require('multer');
const upload = require('../middlewares/multerCourseContent');
const express = require('express');

const {
    getCourseContent,
    createCourseContent,
    deleteCourseContents,
    getSingleContent
} = require('../controllers/courseContentController');

const router = express.Router();

router.get('/', getCourseContent);

router.get('/:id', getSingleContent);

router.route('/').get(getCourseContent).post(upload.single('file'), createCourseContent);

router.delete('/:id', deleteCourseContents);

module.exports = router;