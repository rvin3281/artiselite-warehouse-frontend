import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebarlink-layout',
  templateUrl: './sidebarlink-layout.component.html',
  styleUrls: ['./sidebarlink-layout.component.css'],
})
export class SidebarlinkLayoutComponent {
  productIconRotated: boolean = false;
  inventoryIconRotated: boolean = false;
  inboundIconRotated: boolean = false;
  outboundIconRotated: boolean = false;

  toggleProduct() {
    this.productIconRotated = !this.productIconRotated;
    // Optionally, close the other dropdown when one is opened:
    if (this.productIconRotated) {
      this.inventoryIconRotated = false;
      this.inboundIconRotated = false;
      this.outboundIconRotated = false;
    }
  }

  toggleInventory() {
    this.inventoryIconRotated = !this.inventoryIconRotated;
    // Optionally, close the other dropdown when one is opened:
    if (this.inventoryIconRotated) {
      this.productIconRotated = false;
      this.inboundIconRotated = false;
      this.outboundIconRotated = false;
    }
  }

  toggleInbound() {
    this.inboundIconRotated = !this.inboundIconRotated;
    // Optionally, close the other dropdown when one is opened:
    if (this.inboundIconRotated) {
      this.productIconRotated = false;
      this.outboundIconRotated = false;
      this.inventoryIconRotated = false;
    }
  }

  toggleOutbound() {
    this.outboundIconRotated = !this.outboundIconRotated;
    // Optionally, close the other dropdown when one is opened:
    if (this.outboundIconRotated) {
      this.productIconRotated = false;
      this.inboundIconRotated = false;
      this.inventoryIconRotated = false;
    }
  }
}
