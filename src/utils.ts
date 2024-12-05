// utils/cropImage.js
import * as ImageManipulator from 'expo-image-manipulator';

export default async function getCroppedImg(imageUri : any, pixelCrop : any) {
  try {
    // Ensure the image URI is provided
    if (!imageUri) {
      throw new Error("No image URI provided");
    }

    // Use ImageManipulator to crop the image
    const result = await ImageManipulator.manipulateAsync(
      imageUri,
      [
        {
          crop: {
            originX: pixelCrop.x,
            originY: pixelCrop.y,
            width: pixelCrop.width,
            height: pixelCrop.height,
          },
        },
      ],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );

    // Return the URI of the cropped image
    return result.uri;
  } catch (error) {
    console.error("Error cropping the image:", error);
    throw error;
  }
}
