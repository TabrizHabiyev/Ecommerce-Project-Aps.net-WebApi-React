export interface PhotoUrl {
  photoUrl: string;
  isMain: boolean;
  productId: string;
  product?: any;
  publicId?: any;
  id: string;
  createDate: Date;
  updateDate: Date;
}

export interface ColorList {
  name: string;
  colorCode: string;
  colorProducts?: any;
  id: string;
  createDate: Date;
  updateDate: Date;
}

export interface Product{
  id: string;
  name: string;
  description: string;
  type: string;
  price: number;
  inStock: boolean;
  quantity: number;
  featured: boolean;
  categoryId: string;
  campaignId: string;
  compaignExpiryDate?: any;
  photoUrl: PhotoUrl[];
  tagList: string[];
  colorList: ColorList[];
}
