import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


export default function Analytics(){


const { t } = useTranslation();


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

alert(t("analytics.error"));

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

⏳ {t("analytics.loading")}

</h2>


</div>

);


}







return (

<div className="page">



<h1>

📊 {t("analytics.title")}

</h1>






<div

style={{

display:"grid",

gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",

gap:"20px"

}}

>




<Card

title={"📊 " + t("analytics.total_posts")}

value={data.total_posts}

/>





<Card

title={"✅ " + t("analytics.published_posts")}

value={data.published_posts}

/>





<Card

title={"❤️ " + t("analytics.likes")}

value={data.total_likes}

/>





<Card

title={"💬 " + t("analytics.comments")}

value={data.total_comments}

/>





<Card

title={"🔁 " + t("analytics.shares")}

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