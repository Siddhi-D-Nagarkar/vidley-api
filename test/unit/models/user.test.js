const { User } = require("../../../models/user");


describe("user.generateToken",()=>{
    it("should return valid JWt Token",()=>{
        const user = new User({ _id : 1 , isAdmin : true });
        
    });
});