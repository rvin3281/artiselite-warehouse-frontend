export interface ProductDetails {
  productId: number;
  productSKU: string;
  productName: string;
  category: string;
  location: string;
  supplier: string;
  createdDateTime: string;
  updatedDateTime: string;
}
export interface APIReponseProductCreateDto {
  status: string;
  data: ProductDetails;
  httpstatus: string;
  timestamp: string;
}
export interface ProductCreateDto {
  productSKU: string;
  productName: string;
  category: string;
  location: string;
  supplier: string;
}
