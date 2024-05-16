export interface inboundCreateDto {
  inboundReference: string;
  dateReceived: string;
  quantity: number;
  location: string;
  remarks: string;
  productId: number;
  inventoryId: number;
}
