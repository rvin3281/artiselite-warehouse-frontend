import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ProductServiceService } from 'src/app/services/product/product-service.service';
import { ToastrService } from 'ngx-toastr';
import {
  ProductResponseDto,
  ProdutApiResponse,
} from 'src/app/models/Product/ProductResponseDto.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit, OnDestroy {
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  ColumnMode = ColumnMode;
  loadingIndicator: boolean = false;
  temp: any[] = [];
  rows: ProductResponseDto[] = [];

  private subscription: Subscription = new Subscription();

  constructor(
    private productService: ProductServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllProduct() {
    this.loadingIndicator = true;

    const getAllProducts = this.productService.getAllProduct().subscribe({
      next: (res: ProdutApiResponse) => {
        this.loadingIndicator = false;

        if (res.data && res.data.length > 0) {
          this.toastr.success('View all product');
          this.rows = res.data;
        } else {
          this.toastr.success('No Data Found');
        }
      },
      error: (error: any) => {
        this.loadingIndicator = false;
        this.toastr.error('Internal Server Error');
      },
      complete: () => {},
    });
    this.subscription.add(getAllProducts);
  }
}
