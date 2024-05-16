import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  APIReponseProductCreateDto,
  ProductCreateDto,
} from 'src/app/models/Product/ProductCreateDto.model';
import { ProdutApiResponse } from 'src/app/models/Product/ProductResponseDto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  productAPIUrl: string = environment.productAPI;

  constructor(private http: HttpClient) {}

  getAllProduct(): Observable<ProdutApiResponse> {
    return this.http.get<ProdutApiResponse>(this.productAPIUrl);
  }

  addNewProduct(obj: ProductCreateDto): Observable<APIReponseProductCreateDto> {
    return this.http.post<APIReponseProductCreateDto>(this.productAPIUrl, obj);
  }

  getAllProductSKU() {
    return this.http.get(`${this.productAPIUrl}active-sku/`);
  }

  getLocationByProductId(id: number) {
    return this.http.get(`${this.productAPIUrl}by-location/${id}`);
  }
}
