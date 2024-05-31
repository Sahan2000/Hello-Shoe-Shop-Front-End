export class SupplierModel{
    constructor(supplierCode, supplierName, category, address1, address2,address3, address4, postalCode, country, contactNo1, contactNo2, email){
        this.supplierCode = supplierCode;
        this.supplierName = supplierName;
        this.category = category;
        this.address1 = address1;
        this.address2 = address2;
        this.address3 = address3;
        this.address4 = address4;
        this.postalCode = postalCode;
        this.country = country;
        this.contactNo1 = contactNo1;
        this.contactNo2 = contactNo2;
        this.email = email;
    }
}