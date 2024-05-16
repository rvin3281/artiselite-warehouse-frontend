export interface OutboundCreateDto {
  outboundReference: string;
  dateShipped: string;
  quantity: number;
  destination: string;
  remarks: string;
  productId: number;
  inventoryId: string;
}
