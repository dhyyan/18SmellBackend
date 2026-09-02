import { Request } from 'express';

export const getAbsoluteImageUrl = (req: Request, imageUrl: string | undefined): string => {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://') || imageUrl.startsWith('data:')) {
    return imageUrl;
  }
  
  const host = req.get('host');
  const protocol = req.protocol;
  const cleanPath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  return `${protocol}://${host}${cleanPath}`;
};

export const formatProductImageUrls = (req: Request, products: any): any => {
  if (Array.isArray(products)) {
    return products.map(p => {
      const productObj = p.toObject ? p.toObject() : { ...p };
      if (productObj.imageUrl) {
        productObj.imageUrl = getAbsoluteImageUrl(req, productObj.imageUrl);
      }
      if (productObj.image) {
        productObj.image = getAbsoluteImageUrl(req, productObj.image);
      }
      return productObj;
    });
  } else if (products) {
    const productObj = products.toObject ? products.toObject() : { ...products };
    if (productObj.imageUrl) {
      productObj.imageUrl = getAbsoluteImageUrl(req, productObj.imageUrl);
    }
    if (productObj.image) {
      productObj.image = getAbsoluteImageUrl(req, productObj.image);
    }
    return productObj;
  }
  return products;
};
