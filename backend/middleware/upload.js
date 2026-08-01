const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads"));
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Allow only image files
const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpeg|jpg|png|webp/;

    const isValid =
        allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (isValid) {

        cb(null, true);

    } else {

        cb(new Error("Only image files are allowed!"));

    }

};

const upload = multer({

    storage,
    fileFilter

});

module.exports = upload;