export interface APIResponseInventoryCreateDto {
  httpstatus: string;
  message: string;
  status: string;
  timestamp: string;
}

export interface InventoryCreateDto {
  productSKU: string;
  inStock: number;
}
