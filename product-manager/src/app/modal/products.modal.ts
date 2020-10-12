export class Product{
    constructor(){
        this.attributes = new Attributes();
    }
    productID:string;
    productName:string;
    attributes:Attributes;
    minOrders:string;
    deliveryTime:string;
    location:string;
    productRating:string;
    productPrice:string;
}
export class Attributes{
    attribute1:string;
    attribute2:string;
    attribute3:string;
    image:string;
}