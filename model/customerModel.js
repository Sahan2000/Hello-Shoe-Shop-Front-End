export class CustomerModel{
    constructor(customerId, customerName, gender, level, joinDate, totalPoints, dateOfBirth, addressLine1, addressLine2,
    addressLine3, addressLine4, postalCode, contact, email, recentPurchaseDate){    
        this.customerId = customerId;
        this.customerName = customerName;
        this.gender = gender;
        this.level = level;
        this.joinDate = joinDate;
        this.totalPoints = totalPoints;
        this.dateOfBirth = dateOfBirth;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.addressLine3 = addressLine3;
        this.addressLine4 = addressLine4;
        this.postalCode = postalCode;
        this.contact = contact;
        this.email = email;
        this.recentPurchaseDate = recentPurchaseDate;
    }
}