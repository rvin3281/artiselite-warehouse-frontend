import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { Subscription, forkJoin } from 'rxjs';
import { OutboundCreateDto } from 'src/app/models/Outbound/OutboundCreateDto.model';
import { ProductResponseDto } from 'src/app/models/Product/ProductResponseDto.model';
import { InventoryServiceService } from 'src/app/services/inventory/inventory-service.service';
import { OutboundServiceService } from 'src/app/services/outbound/outbound-service.service';
import { ProductServiceService } from 'src/app/services/product/product-service.service';

@Component({
  selector: 'app-add-outbound',
  templateUrl: './add-outbound.component.html',
  styleUrls: ['./add-outbound.component.css'],
})
export class AddOutboundComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  psku: ProductResponseDto[] = [];

  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private outboundService: OutboundServiceService,
    private productService: ProductServiceService,
    private inventoryService: InventoryServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.bsConfig = {
      dateInputFormat: 'YYYY-MM-DD',
      isAnimated: true,
    };

    this.addOutboundForm.get('dateReceived')?.valueChanges.subscribe((date) => {
      if (date) {
        const formattedDate = this.formatDate(date);
        // Update the form control with the formatted date without emitting a new change event
        this.addOutboundForm
          .get('dateReceived')
          ?.setValue(formattedDate, { emitEvent: false });
      }
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  addOutboundForm: FormGroup = new FormGroup({
    outboundReference: new FormControl('', Validators.required),
    dateShipped: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    remarks: new FormControl('', Validators.required),
    productId: new FormControl('', Validators.required),
    inventoryId: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.addOutboundForm.valid) {
      const formData: OutboundCreateDto = this.addOutboundForm.value;

      const addOutbound = this.outboundService
        .saveOutbound(formData)
        .subscribe({
          next: (res) => {
            this.toastr.success('Inventory Updated');
            this.router.navigateByUrl('/view-inventory');
          },
          error: (err) => {
            console.error(err);
            this.toastr.error(err.error.message);
          },
          complete: () => {},
        });

      this.subscription.add(addOutbound);
    }
  }

  onCancel() {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const getAllActiveProductSKU = this.productService
      .getAllProduct()
      .subscribe({
        next: (res: any) => {
          this.psku = res.data;
          this.addOutboundForm.get('location')?.setValue(res.data.location);
        },
        error: (err) => {},
        complete: () => {},
      });

    this.subscription.add(getAllActiveProductSKU);

    this.addOutboundForm
      .get('productId')
      ?.valueChanges.subscribe((selectedProductId) => {
        if (selectedProductId) {
          forkJoin({
            inventory:
              this.inventoryService.getInventoryByProductId(selectedProductId),
          }).subscribe({
            next: (results: any) => {
              const inventoryData = results.inventory as {
                data: { inventoryId: number };
              };

              if (inventoryData.data) {
                this.addOutboundForm
                  .get('inventoryId')
                  .setValue(inventoryData.data.inventoryId);
              }
            },
            error: (err) => {
              this.addOutboundForm.get('inventoryId')?.setValue('');

              this.toastr.error('Failed to fetch data');
            },
          });
        } else {
          this.addOutboundForm.get('destination')?.setValue('');
        }
      });
  }
}
