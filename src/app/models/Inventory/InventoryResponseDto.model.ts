import { ProductResponseDto } from '../Product/ProductResponseDto.model';

export interface APIInventoryResponse {
  httpstatus: string;
  data: InventoryResponseDto[];
  length: number;
  status: string;
  timestamp: string;
}

export interface InventoryResponseDto {
  inventoryId: number;
  inStock: number;
  productResponseDto: ProductResponseDto;
  createdDateTime: string;
  updatedDateTime: string;
}
