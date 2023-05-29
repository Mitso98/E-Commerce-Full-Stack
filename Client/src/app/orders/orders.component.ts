import { Component, OnInit, SimpleChanges } from '@angular/core';
import { OrdersService } from '../Services/ordersServices/orders.service';
import { OrderResponse } from '../Models/orders_models/orders.models';
import { Subscription } from 'rxjs';
import { CartService } from '../Services/cartServices/cart.service';
import { ProductsService } from '../Services/productsServices/products.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  ordersList!: OrderResponse[];
  errorMessage: any = { error: '', id: null };
  sortOption: string = 'all';
  filteredOrders!: any[];
  constructor(
    private ordersService: OrdersService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.ordersService.orderModified.subscribe((_) => this.getOrders());
    this.getOrders();
    this.filterOrders();
  }
  filterOrders() {
    if (this.sortOption === 'all') {
      this.filteredOrders = this.ordersList;
    } else {
      this.filteredOrders = this.ordersList.filter((order: any) => {
        console.log(order);
        switch (this.sortOption) {
          case 'is_paid':
            return order.payment_details['order_is_paid'];
          case 'is_not_paid':
            return !order.payment_details['order_is_paid'];
          case 'is_shipped':
            return order.shipment_details['is_shipped'];
          case 'is_not_shipped':
            return !order.shipment_details['is_shipped'];
          case 'is_delivered':
            return order.shipment_details['is_delivered'];
          case 'is_not_delivered':
            return !order.shipment_details['is_delivered'];
          default:
            break;
        }
      });
    }
  }
  getCategoryNames(item: any): string[] {
    const categoryNames: string[] = [];

    for (const category of item.product.categories) {
      if (!categoryNames.includes(category.name)) {
        categoryNames.push(category.name);
      }
    }

    return categoryNames;
  }

  getOrders() {
    this.ordersService.getOrders().subscribe({
      next: (order) => {
        this.ordersList = order.body as OrderResponse[];
        this.filterOrders();
        this.errorMessage.error = '';
        this.errorMessage.id = '';
      },
      error: (err) => {
        this.ordersList = [];
      },
    });
  }

  deleteOrder(id: number) {
    this.ordersService.deleteOrder(id).subscribe({
      next: (response) => {
        this.ordersService.orderModified.emit();
        this.productsService.modifiedProductsList.emit();
      },
      error: (error) => {
        this.errorMessage.error = error.error.error;
        this.errorMessage.id = error.error.id;
      },
    });
  }

  editPayment(id: number, data: { is_paid: boolean }): void {
    this.ordersService.editPayment(id, data).subscribe({
      next: (_) => {
        this.errorMessage.error = '';
        this.errorMessage.id = null;
        this.getOrders();
      },
      error: (error) => {
        this.errorMessage.error = error.error.error;
        this.errorMessage.id = error.error.id;
      },
    });
  }

  sortOrders(option: string) {}
}
