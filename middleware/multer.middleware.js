const AWS = require('aws-sdk');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
  
  const app = express();
  
  // Define the upload route
  app.post('/upload', upload.single('imgUrl'), (req, res) => {
    console.log(req.file); // Should log the file object
    console.log(req.body); // Should log the other form fields
    res.send('File received');
  });