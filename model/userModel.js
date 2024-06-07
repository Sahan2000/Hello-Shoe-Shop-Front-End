export class UserModel{
    constructor(email, password, role,branchId){
        this.email = email;
        this.password= password;
        this.role = role;
        this.branchId = branchId;
    }
}