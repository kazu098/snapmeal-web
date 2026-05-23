export const getBlogCardImage = (image: string): string => {
  if (!/-thumbnail-1600x900\.(png|jpe?g)$/.test(image)) {
    return image;
  }

  return image.replace(/-thumbnail-1600x900\.(png|jpe?g)$/, '-card-640x360.webp');
};
