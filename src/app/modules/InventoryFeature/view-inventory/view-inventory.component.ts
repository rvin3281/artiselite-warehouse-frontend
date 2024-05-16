import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import {
  APIInventoryResponse,
  InventoryResponseDto,
} from 'src/app/models/Inventory/InventoryResponseDto.model';
import { InventoryServiceService } from 'src/app/services/inventory/inventory-service.service';

@Component({
  selector: 'app-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.css'],
})
export class ViewInventoryComponent implements OnInit, OnDestroy {
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  ColumnMode = ColumnMode;
  loadingIndicator: boolean = false;
  temp: any[] = [];
  rows: InventoryResponseDto[] = [];

  private subscription: Subscription = new Subscription();

  constructor(
    private inventoryService: InventoryServiceService,
    private toastr: ToastrService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllInventory();
  }

  getAllInventory() {
    this.loadingIndicator = true;

    const getAllInventories = this.inventoryService
      .getAllInventory()
      .subscribe({
        next: (res: APIInventoryResponse) => {
          this.loadingIndicator = false;

          if (res.data && res.data.length > 0) {
            console.log(res.data);
            this.toastr.success(`Total ${res.data.length} records`);
            this.rows = res.data;
          } else {
            this.toastr.success('No Data Found');
          }
        },
        error: (err) => {
          this.loadingIndicator = false;
          this.toastr.error(err.error.message);
        },
        complete: () => {},
      });
    this.subscription.add(getAllInventories);
  }
}
