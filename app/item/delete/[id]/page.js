"use client";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import useAuth from "../../../utils/useAuth";

const DeleteItem = (context) => {

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const loginUserEmail = useAuth();

  useEffect(()=>{

    const getSingleItem = async(id) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, {cache: "no-store"});
      const jsonData = await response.json();
      const singleItem = jsonData.singleItem;
      // return singleItem;
      setTitle(singleItem.title)
      setPrice(singleItem.price)
      setImage(singleItem.image)
      setDescription(singleItem.description)
      setEmail(singleItem.email)
      setLoading(true)
    }

    // getSingleItem(context.params.id);
    // context.params は Promise なので、unwrap する
    (async () => {
      const { id } = await context.params;
      getSingleItem(id);
    })();

  }, [context])

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const { id } = await context.params;
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          email: loginUserEmail
        })
      });
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
      router.refresh();
    }catch{
      alert("アイテム削除失敗")
    }
  }

  if(loading){
    if(loginUserEmail === email){
      return (
        <div>
          <title>削除ページ</title>
          <meta name="description" content="削除ページです"/>
          <h1 className="page-title">アイテム削除</h1>
          <form onSubmit={handleSubmit}>
            <h2>{title}</h2>
            <Image src={image} width={750} height={500} alt="item-image" priority/>
            <h3>&yen;{price}</h3>
            <p>{description}</p>
            <button>削除</button>
          </form>
        </div>
      )
    }else{
      return <h1>権限がありません</h1>
    }
  }else{
    return <h1>ローディング中...</h1>
  }


}

export default DeleteItem