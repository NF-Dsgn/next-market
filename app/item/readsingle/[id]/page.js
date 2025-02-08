import Image from "next/image";
import Link from "next/link";

const getSingleItem = async(id) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, {cache: "no-store"});
  const jsonData = await response.json();
  // console.log(jsonData);
  // console.log(jsonData.singleItem);
  const singleItem = jsonData.singleItem;
  return singleItem;
}

const ReadSingleItem = async(context) => {
  const { id } = await context.params;
  const singleItem = await getSingleItem(id);
  // console.log(singleItem);
  return (
    <div className="grid-container-si">
      <div>
        <Image src={singleItem.image} width={750} height={500} alt="item-image" priority />
      </div>
      <div>
        <h1>{singleItem.title}</h1>
        <h2>&yen;{singleItem.price}</h2>
        <hr/>
        <p>{singleItem.description}</p>
        <div>
          <Link href={`/item/update/${singleItem._id}`}>アイテム編集</Link>
          <Link href={`/item/delete/${singleItem._id}`}>アイテム削除</Link>
        </div>
      </div>
    </div>
  )
}

export default ReadSingleItem