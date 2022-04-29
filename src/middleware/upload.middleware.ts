import multer from "multer";

const MAX_SIZE = 1024 * 1024 * 10;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {},
  filename: (req, file, cb) => {},
});

export const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
}).single("file");
