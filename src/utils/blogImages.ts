export const getBlogCardImage = (image: string): string => {
  if (!image.endsWith('-thumbnail-1600x900.png')) {
    return image;
  }

  return image.replace('-thumbnail-1600x900.png', '-card-640x360.webp');
};
