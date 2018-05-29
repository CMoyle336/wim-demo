import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', loadChildren: './page/home/home.module#HomeModule'},
  { path: 'product', loadChildren: './page/product-details/product-details.module#ProductDetailsModule'},
  { path : 'product-list', loadChildren : './page/product-list/product-list.module#ProductListModule'},
  { path : 'search/:query', loadChildren : './page/product-list/product-list.module#ProductListModule'},
  { path : 'cart', loadChildren : './page/cart/cart.module#CartModule'},
  { path : 'address', loadChildren : './page/address/address.module#AddressModule'},
  { path : 'shipping', loadChildren : './page/shipping/shipping.module#ShippingModule'},
  { path : 'payment', loadChildren : './page/payment/payment.module#PaymentModule'},
  { path : 'review', loadChildren : './page/review/review.module#ReviewModule'},
  { path : 'order-list', loadChildren : './page/order-list/order-list.module#OrderListModule'},
  { path : 'complete/:id', loadChildren : './page/complete/complete.module#CompleteModule'},
  { path : 'order-details/:id', loadChildren : './page/order-details/order-details.module#OrderDetailsModule'},
  { path: 'bulk-order', loadChildren: './page/bulk-order/bulk-order.module#BulkOrderModule'},
  { path: 'wish-list', loadChildren: './page/wish-list/wish-list.module#WishListModule'},
  { path: 'contact', loadChildren: './page/contact/contact.module#ContactModule'},
  { path: 'dashboard', loadChildren: './page/dashboard/dashboard.module#DashboardModule'},
  { path: 'compare-products', loadChildren: './page/compare-products/compare-products.module#CompareProductsModule'},
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes,  { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
