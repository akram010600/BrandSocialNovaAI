import { useEffect, useState } from "react";


export default function Analytics(){


  const [data,setData] = useState(null);

  const [loading,setLoading] = useState(true);



  async function loadAnalytics(){


    try{


      const response = await fetch(
        "http://127.0.0.1:8000/api/analytics"
      );


      const result = await response.json();


      setData(result);


    }

    catch(error){

      console.error(error);

      alert("خطأ في تحميل التحليلات");

    }

    finally{

      setLoading(false);

    }

  }




  useEffect(()=>{


    loadAnalytics();


  },[]);




  if(loading){

    return (

      <div className="page">

        <h2>
          ⏳ جاري تحميل التحليلات...
        </h2>

      </div>

    );

  }





  return (

    <div className="page">


      <h1>
        📊 التحليلات
      </h1>



      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
          gap:"20px"
        }}
      >


        <Card

          title="📊 عدد المنشورات"

          value={data.total_posts}

        />



        <Card

          title="✅ المنشورات المنشورة"

          value={data.published_posts}

        />



        <Card

          title="❤️ الإعجابات"

          value={data.total_likes}

        />



        <Card

          title="💬 التعليقات"

          value={data.total_comments}

        />



        <Card

          title="🔁 المشاركات"

          value={data.total_shares}

        />


      </div>



    </div>

  );


}




function Card({title,value}){


return (

<div

style={{

background:"#fff",

padding:"25px",

borderRadius:"20px",

boxShadow:"0 5px 20px #ddd",

textAlign:"center"

}}

>


<h3>

{title}

</h3>


<h1>

{value}

</h1>


</div>


);


}