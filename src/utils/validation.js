import bcrypt from "bcrypt";

export const validation = async(req, user)=>{
    const data = req.body;
    console.log("Data = ", data, " user = ", user);
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if(!isPasswordValid)
    {
        throw new Error("Password incorrect!");
    }
    else{
        return;
    }
}