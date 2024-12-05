import { useCallback, useState } from "react";

export const useUploadImage = (image:any, newAssetToUpload:any, uploadConfig:any, onCompleted:any) => {
  console.log("image1 = " ,image);

  const [isUploading, setIsUploading] = useState(false);
 
  const onGetAssetCompleted = useCallback(async () => {
    try {
      console.log("hlw calling");
      console.log("image check:", image);
      console.log("newAsset", newAssetToUpload);
      console.log("uploadConfig", uploadConfig);
  
      if (image && newAssetToUpload && uploadConfig) {
        console.log("check image, newAsset, uploadConfig");

        const updatedFile: any = {
          uri: image.url,
          type: `image/${image.url.split('.').pop()}`,
          name: `image.${image.url.split('.').pop()}`
        }

        console.log("uploadFIle = ", updatedFile);
  
        // Create the Cloudinary config
        const config = {
          publicId: newAssetToUpload.publicId,
          cloudName: newAssetToUpload.cloudName,
          apiKey: uploadConfig.apiKey,
          signature: uploadConfig.signature,
          timestamp: uploadConfig.timestamp,
        };
  
        // Create the form data
        const formData = new FormData();
        formData.append("api_key", config.apiKey);
        formData.append("timestamp", config.timestamp.toString());
        formData.append("signature", config.signature);
        formData.append("public_id", config.publicId);
        formData.append("file", updatedFile);
  
        console.log("jahir file check", image);
  
        // Upload to Cloudinary
        const uploadUrl = `https://api.cloudinary.com/v1_1/${config?.cloudName}/image/upload`;
        console.log("Uploading to URL:", uploadUrl);
  
        const response = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
        });
  
        console.log("API check", response);
  
        // Handle the response
        const isSuccess = response.status >= 200 && response.status <= 299;
  
        const result = isSuccess
          ? {
              wasSuccessful: true,
              publicId: config.publicId,
            }
          : {
              wasSuccessful: false,
              errorMessage:
                response.status === 400
                  ? "That image was too large after transformation, please try a smaller image."
                  : "Something went wrong, please try again.",
            };
  
        console.log("Upload result:", result);
        onCompleted(result);
      }
    } catch (error) {
      console.error("Error during asset upload:", error);
  
      // Call onCompleted with an error result
      onCompleted({
        wasSuccessful: false,
        errorMessage: "An unexpected error occurred during the upload, please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  }, [image, newAssetToUpload, uploadConfig, onCompleted]);

  const uploadImage = useCallback(() => {
    if (image) {
      setIsUploading(true);
      onGetAssetCompleted();
    }
  }, [image, onGetAssetCompleted]);

  return {
    uploadImage,
    isUploadingImage: isUploading,
  };
};
