const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const { S3_ACCESS_KEY, S3_SECRET_KEY } = process.env;

aws.config.update({
  secretAccessKey: S3_SECRET_KEY,
  accessKeyId: S3_ACCESS_KEY,
  region: 'ap-southeast-1',
});

//creating s3 instances
const s3 = new aws.S3();

//creating upload object
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'pc-food-bucket',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;
