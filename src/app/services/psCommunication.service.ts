import { Injectable } from '@angular/core';

@Injectable({
    providedIn : 'root'
})
export class PSComunication {

    shippingCharges: number;
    productColorIndex: number;

    constructor() { this.productColorIndex = 5;  }

    setShippingCharges(charge): void {
        this.shippingCharges = charge;
    }

    setProductColor(index): void {
        this.productColorIndex = index;
    }

    getShippingCharges(): number {
        return (this.shippingCharges) ? this.shippingCharges : 0;
    }

}
