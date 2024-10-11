import cloudinary from 'next-cloudinary';

cloudinary.config({
    cloud_name: 'dohaappga',
    api_key: '744695929654193',
    api_secret: 'aAUBrs1ow4h2cPMn0MzlVJVMIro',
});

export const uploadToCloud = async (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
            }
        ).end(file.buffer);
    });
};