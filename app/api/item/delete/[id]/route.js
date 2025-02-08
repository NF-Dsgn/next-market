import { NextResponse } from "next/server";
import connectDB from "../../../../utils/database";
import {ItemModel} from "../../../../utils/schemaModels";

export async function DELETE(request, context){

  const reqBody = await request.json();
  try{
    const {id} = await context.params;
    await connectDB();
    const singleItem = await ItemModel.findById(id);

    if(singleItem.email === reqBody.email){
      await ItemModel.deleteOne({_id: id});
      return NextResponse.json({message:"アイテム削除成功"});
    }else{
      return NextResponse.json({message:"他の人が作成したアイテムです"});
    }
  }catch{
    return NextResponse.json({message:"アイテム削除失敗"});
  }
}