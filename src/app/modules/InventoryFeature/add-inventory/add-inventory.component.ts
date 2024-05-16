import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { InventoryCreateDto } from 'src/app/models/Inventory/InventoryCreateDto.model';
import { InventoryServiceService } from 'src/app/services/inventory/inventory-service.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css'],
})
export class AddInventoryComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  constructor(
    private inventoryService: InventoryServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  addInventoryForm: FormGroup = new FormGroup({
    productSKU: new FormControl('', Validators.required),
    inStock: new FormControl(''),
  });

  onSubmit() {
    if (this.addInventoryForm.valid) {
      const formData: InventoryCreateDto = this.addInventoryForm.value;

      const addProduct = this.inventoryService
        .addNewInventory(formData)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Inventory added successfully !');
            this.router.navigateByUrl('/view-inventory');
          },
          error: (err) => {
            console.error(err);
            this.toastr.error(err.error.message);
          },
          complete: () => {},
        });

      this.subscription.add(addProduct);
    }
  }

  onCancel() {
    this.router.navigateByUrl('/view-inventory');
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
