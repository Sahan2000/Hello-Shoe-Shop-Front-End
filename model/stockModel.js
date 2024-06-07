export class StockModel {
    constructor(supplierId,itemId,sizeId,quantity, unitBuyingPrice, unitSellingPrice) {
        this.supplierId = supplierId;
        this.itemId = itemId;
        this.sizeId = sizeId;
        this.quantity = quantity;
        this.unitBuyingPrice = unitBuyingPrice;
        this.unitSellingPrice = unitSellingPrice;
    }

}