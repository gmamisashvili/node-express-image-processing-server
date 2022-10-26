/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
const { Router } = require('express');
const multer = require('multer');
const { response } = require('../app');

const router = Router();

const storage = multer.diskStorage({
  destination: 'api/uploads/',
  filename: fileName,
});

const upload = multer({
  fileFilter: fileFilter(),
  storage: storage,
});

function fileName(request, file, callback) {
  callback(null, file.originalname);
}

function fileFilter(req, file, callback) {
  if (file.mimetype !== 'image/png') {
    request.fileValidationError = 'Wrong file type';
    callback(null, false, new Error('Wrong file type'));
  } else {
    callback(null, true);
  }
}

router.post('/upload', upload.single('photo'), (req, res) => {
  if (req['fileValidationError']) {
    response.status(400).json({ error: req['fileValidationError'] });
  } else {
    res.status(201).json({ success: true });
  }
});

module.exports = router;
