import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductCreateDto } from 'src/app/models/Product/ProductCreateDto.model';
import { ProductServiceService } from 'src/app/services/product/product-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  constructor(
    private productService: ProductServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  addProductForm: FormGroup = new FormGroup({
    productSKU: new FormControl('', Validators.required),
    productName: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    supplier: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.addProductForm.valid) {
      const formData: ProductCreateDto = this.addProductForm.value;

      const addProduct = this.productService.addNewProduct(formData).subscribe({
        next: (res) => {
          this.toastr.success('Product added successfully !');
          this.router.navigateByUrl('/view-product');
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
    this.router.navigateByUrl('/view-product');
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
