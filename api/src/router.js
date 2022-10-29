/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const imageProcessor = require('./imageProcessor');
const { tryCatch } = require('ramda');

const router = Router();
const photoPath = path.resolve(__dirname, '../../client/photo-viewer.html');

const storage = multer.diskStorage({
  destination: 'api/uploads/',
  filename: filename,
});

function filename(request, file, callback) {
  callback(null, file.originalname);
}

const fileFilter = (request, file, callback) => {
  if (file.mimetype !== 'image/png') {
    request.fileValidationError = 'Wrong file type';
    callback(null, false, new Error('Wrong file type'));
  } else {
    callback(null, true);
  }
};

const upload = multer({
  fileFilter,
  storage,
});

router.get('/photo-viewer', (request, response) => {
  response.sendFile(photoPath);
});

router.post('/upload', upload.single('photo'), async (request, response) => {
  if (request.fileValidationError) {
    return response.status(400).json({ error: request.fileValidationError });
  }
  try {
    await imageProcessor(request.file.filename);
  } catch (e) {

  }

  return response.status(201).json({ success: true });
});

module.exports = router;
