export interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Creates a cropped image from the provided image source and crop area
 * @param imageSrc - The source image URL
 * @param pixelCrop - The crop area in pixels
 * @param fileName - The name for the output file
 * @returns A Promise that resolves to a File object containing the cropped image
 */
export const createCroppedImage = async (
  imageSrc: string,
  pixelCrop: Area,
  fileName: string = "cropped-image.jpg"
): Promise<File> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  // Set canvas size to match the crop area
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the cropped image
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Convert canvas to blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }

      // Convert blob to File
      const file = new File([blob], fileName, {
        type: "image/jpeg",
        lastModified: Date.now(),
      });

      resolve(file);
    }, "image/jpeg");
  });
};

/**
 * Creates an Image element from a URL
 * @param url - The image URL
 * @returns A Promise that resolves to an HTMLImageElement
 */
const createImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
};
