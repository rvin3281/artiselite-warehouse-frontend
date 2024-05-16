import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { Subscription, forkJoin } from 'rxjs';
import { inboundCreateDto } from 'src/app/models/Inbound/InboundCreateDto.model';
import { ProductResponseDto } from 'src/app/models/Product/ProductResponseDto.model';
import { ProductSKUList } from 'src/app/models/Product/ProductSKU.model';
import { InboundServiceService } from 'src/app/services/inbound/inbound-service.service';
import { InventoryServiceService } from 'src/app/services/inventory/inventory-service.service';
import { ProductServiceService } from 'src/app/services/product/product-service.service';

@Component({
  selector: 'app-add-inbound',
  templateUrl: './add-inbound.component.html',
  styleUrls: ['./add-inbound.component.css'],
})
export class AddInboundComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  psku: ProductResponseDto[] = [];

  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private inboundService: InboundServiceService,
    private productService: ProductServiceService,
    private inventoryService: InventoryServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.bsConfig = {
      dateInputFormat: 'YYYY-MM-DD',
      isAnimated: true,
    };

    this.addInboundForm.get('dateReceived')?.valueChanges.subscribe((date) => {
      if (date) {
        const formattedDate = this.formatDate(date);
        // Update the form control with the formatted date without emitting a new change event
        this.addInboundForm
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

  addInboundForm: FormGroup = new FormGroup({
    inboundReference: new FormControl('', Validators.required),
    dateReceived: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    remarks: new FormControl('', Validators.required),
    productId: new FormControl('', Validators.required),
    inventoryId: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.addInboundForm.valid) {
      const formData: inboundCreateDto = this.addInboundForm.value;

      const addInbound = this.inboundService.saveInbound(formData).subscribe({
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

      this.subscription.add(addInbound);
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
          this.addInboundForm.get('location')?.setValue(res.data.location);
        },
        error: (err) => {},
        complete: () => {},
      });

    this.subscription.add(getAllActiveProductSKU);

    this.addInboundForm
      .get('productId')
      ?.valueChanges.subscribe((selectedProductId) => {
        if (selectedProductId) {
          forkJoin({
            inventory:
              this.inventoryService.getInventoryByProductId(selectedProductId),
            location:
              this.productService.getLocationByProductId(selectedProductId),
          }).subscribe({
            next: (results: any) => {
              const inventoryData = results.inventory as {
                data: { inventoryId: number };
              };
              const locationData = results.location as { data: string };
              if (inventoryData.data && locationData.data) {
                this.addInboundForm
                  .get('inventoryId')
                  .setValue(inventoryData.data.inventoryId);

                this.addInboundForm.get('location').setValue(locationData.data);
              }
            },
            error: (err) => {
              this.addInboundForm.get('inventoryId')?.setValue('');
              this.addInboundForm.get('location')?.setValue('');
              this.toastr.error('Failed to fetch data');
            },
          });
        } else {
          this.addInboundForm.get('inventoryId')?.setValue('');
        }
      });
  }
}
