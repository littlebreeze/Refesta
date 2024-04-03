import imageCompression from 'browser-image-compression';

const browserImageCompression = async (file) => {
  try {
    const options = {
      maxSizeMb: 1,
      maxWidthOrHeight: 1024,
    };
    return await imageCompression(file, options);
  } catch (error) {
    console.log('이미지 압축 실패:', error);
  }
  return;
};

export default browserImageCompression;
