import { useEffect, useState } from "react";

import {
  FileText,
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  Megaphone,
  CalendarDays,
  Image,
  PenSquare
} from "lucide-react";

import { useNavigate } from "react-router-dom";



export default function Dashboard(){


const navigate = useNavigate();



const [stats,setStats]=useState({

total_posts:0,

published_posts:0,

total_likes:0,

total_comments:0,

total_shares:0

});





async function loadStats(){


try{


const response = await fetch(

"http://127.0.0.1:8000/api/analytics"

);


const data = await response.json();


setStats(data);


}

catch(error){

console.log(error);

}


}





useEffect(()=>{


loadStats();


},[]);







const cards=[


{

title:"إجمالي المنشورات",

value:stats.total_posts,

icon:<FileText size={32}/>

},



{

title:"المنشورات المنشورة",

value:stats.published_posts,

icon:<Sparkles size={32}/>

},



{

title:"الإعجابات",

value:stats.total_likes,

icon:<Heart size={32}/>

},



{

title:"التعليقات",

value:stats.total_comments,

icon:<MessageCircle size={32}/>

},



{

title:"المشاركات",

value:stats.total_shares,

icon:<Share2 size={32}/>

}


];







return(


<div className="page dashboard">



<div className="dashboard-header">


<h1>

🚀 BrandSocialNova AI

</h1>


<p>

لوحة التحكم الذكية لإدارة التسويق وصناعة المحتوى

</p>


</div>







<div className="dashboard-grid">


{

cards.map((item,index)=>(


<div

className="stat-card"

key={index}

>


<div className="stat-icon">

{item.icon}

</div>



<div>

<h3>

{item.title}

</h3>


<h1>

{item.value}

</h1>

</div>



</div>


))


}


</div>








<div className="quick-section">


<h2>

⚡ أدوات الذكاء الاصطناعي

</h2>




<div className="quick-grid">



<button

onClick={()=>navigate("/create")}

>

<PenSquare/>

إنشاء منشور AI

</button>





<button

onClick={()=>navigate("/image-generator")}

>

<Image/>

تصميم صورة AI

</button>






<button

onClick={()=>navigate("/campaigns")}

>

<Megaphone/>

إنشاء حملة

</button>






<button

onClick={()=>navigate("/calendar")}

>

<CalendarDays/>

تقويم المحتوى

</button>



</div>


</div>








<div className="ai-status">


<h2>

🤖 حالة النظام

</h2>


<p>

🟢 AI Engine يعمل

</p>


<p>

✅ قاعدة البيانات متصلة

</p>


<p>

🚀 BrandSocialNova جاهز لإدارة المحتوى

</p>


</div>





</div>


);


}