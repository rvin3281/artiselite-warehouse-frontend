export interface ProdutApiResponse {
  httpstatus: string;
  data: ProductResponseDto[];
  length: number;
  status: string;
  timestamp: string;
}

export interface ProductResponseDto {
  productId: number;
  productSKU: string;
  productName: string;
  category: string;
  location: string;
  supplier: string;
  createdDateTime: string;
  updatedDateTime: string;
}
