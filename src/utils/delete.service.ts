import cloudinary from '../config/cloudinary.config'

export const deleteCloudinaryImage = async (publicId: string, type: string) => {
    try {
        if (!publicId) throw new Error('No public id provided')
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: type,
        })
        return result
    } catch (error) {
        console.log('delete cloudinary failed')
        throw error
    }
}
