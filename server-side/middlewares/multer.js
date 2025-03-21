import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/vnd.ms-excel", // for .xls files
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // for .xlsx files
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(
        new Error(
          "Invalid file type. Only JPG, PNG, GIF, and Excel files are allowed."
        ),
        false
      ); // Reject the file
    }
  },
});

export default upload;
