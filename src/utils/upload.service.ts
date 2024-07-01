import path from 'path'
import cloudinary from '../config/cloudinary.config'
import fs from 'node:fs'

interface FileI {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    destination: string
    filename: string
    path: string
    size: number
}

interface FileUploadServiceI {
    [key: string]: FileI[]
}

export const uploadService = async (file: FileUploadServiceI, type: string) => {
    const files = file as FileUploadServiceI
    const fileName = files[type][0].filename
    const filePath = path.resolve(__dirname, '../uploads', fileName)
    const memeType = files[type][0].mimetype.split('/').at(-1)

    // upload to cloudinary
    const uploaded = await cloudinary.uploader.upload(filePath, {
        resource_type: memeType === 'pdf' ? 'raw' : 'image',
        filename_override: fileName,
        folder: type,
        format: memeType,
    })
    await fs.promises.unlink(filePath)
    return uploaded
}

// const files = file as FileUploadServiceI
//     const coverName = files.coverImage[0].filename
//     const coverPath = path.resolve(__dirname, '../uploads', coverName)
//     const memeType = files.coverImage[0].mimetype.split('/')[1]

//     const result = await cloudinary.uploader.upload(coverPath, {
//         filename_override: coverName,
//         folder: 'book-covers',
//         format: memeType,
//     })
//     await fs.promises.unlink(coverPath)
//     console.log(result)
//     return res.status(200).json({ message: 'Book created' })
