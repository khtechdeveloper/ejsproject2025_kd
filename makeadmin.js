const User=require('./models/User');
const bcrypt= require('bcrypt');
async function makeAdmin() {
    try{
        let user=await User.findOne({email: 'kd@gmail.com'})
        if(user){
            console.log("user updated.");
        }else{
        user=new User();
        user.firstName='Khajamuddin',
        user.lastName='Ansari',
        user.email='kd@gmail.com';
        let encryptedpassword = bcrypt.hashSync('12345',10);
        user.password=encryptedpassword;
        user.userType='Admin';
        await user.save();
        console.log("Admin saved sucessfully...");
        }

    }catch(err){
        console.log(err)
    }
}

module.exports=makeAdmin;