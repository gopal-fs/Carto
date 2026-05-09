import shopModel from "../schemas/shopSchema.js";



export const updateShopStatus=async(req,res)=>{
    try{
        const {shop_id,ans}=req.body;

        if(!shop_id || typeof ans !== "boolean"){
            return res.status(400).send({success:false,message:"shop_id and boolean ans required"});
        }

        const updated=await shopModel.findOneAndUpdate(
            {shop_id},
            {isApproved:ans},
            {new:true}
        );

        if(!updated){
            return res.status(404).send({success:false,message:"Shop not found"});
        }

        return res.status(200).send({
            success:true,
            message:"Status Updated Successfully",
            shop:{shop_id:updated.shop_id,isApproved:updated.isApproved}
        });
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({success:false,message:"Failed to Update Status"});
    }
}