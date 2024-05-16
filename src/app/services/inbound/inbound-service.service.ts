import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inboundCreateDto } from 'src/app/models/Inbound/InboundCreateDto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InboundServiceService {
  inboundApiUrl: string = environment.inboundAPI;

  constructor(private http: HttpClient) {}

  saveInbound(obj: inboundCreateDto) {
    return this.http.post(this.inboundApiUrl, obj);
  }
}
