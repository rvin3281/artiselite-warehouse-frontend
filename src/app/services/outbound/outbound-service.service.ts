import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OutboundCreateDto } from 'src/app/models/Outbound/OutboundCreateDto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OutboundServiceService {
  outboundApiUrl = environment.outboundAPI;

  constructor(private http: HttpClient) {}

  saveOutbound(obj: OutboundCreateDto) {
    return this.http.post(this.outboundApiUrl, obj);
  }
}
