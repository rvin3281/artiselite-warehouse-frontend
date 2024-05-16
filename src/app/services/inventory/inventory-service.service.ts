import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryCreateDto } from 'src/app/models/Inventory/InventoryCreateDto.model';
import { APIInventoryResponse } from 'src/app/models/Inventory/InventoryResponseDto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InventoryServiceService {
  inventoryAPIUrl: string = environment.inventoryAPI;

  constructor(private http: HttpClient) {}

  getAllInventory(): Observable<APIInventoryResponse> {
    return this.http.get<APIInventoryResponse>(this.inventoryAPIUrl);
  }

  addNewInventory(obj: InventoryCreateDto) {
    return this.http.post(this.inventoryAPIUrl, obj);
  }

  getInventoryByProductId(id: number) {
    return this.http.get(`${this.inventoryAPIUrl}by-product/${id}`);
  }
}
