import path from 'node:path'
import multer, { StorageEngine } from 'multer'

const storage: StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    },
})
// calculate 10 mb
export const upload = multer({
    storage,
    limits: {
        fieldSize: 10 * 1024 * 1024,
    },
})
