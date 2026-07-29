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
  PenSquare,
  Activity
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";



export default function Dashboard(){


const navigate = useNavigate();

const { t } = useTranslation();


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
title:t("dashboard.total_posts"),
value:stats.total_posts,
icon:<FileText/>
},

{
title:t("dashboard.published_posts"),
value:stats.published_posts,
icon:<Sparkles/>
},

{
title:t("dashboard.likes"),
value:stats.total_likes,
icon:<Heart/>
},

{
title:t("dashboard.comments"),
value:stats.total_comments,
icon:<MessageCircle/>
},

{
title:t("dashboard.shares"),
value:stats.total_shares,
icon:<Share2/>
}

];







return(

<div className="dashboard">



<section className="hero">


<div>

<h1>
🚀 BrandSocialNova AI
</h1>


<p>
{t("dashboard.subtitle")}
</p>


</div>



<div className="ai-badge">

🟢 AI Engine Active

</div>



</section>








<section className="stats-grid">


{

cards.map((item,index)=>(


<div className="stat-card" key={index}>


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


</section>








<section className="quick-section">


<h2>

⚡ {t("dashboard.ai_tools")}

</h2>



<div className="quick-grid">



<button onClick={()=>navigate("/create")}>

<PenSquare/>

{t("dashboard.create_post")}

</button>




<button onClick={()=>navigate("/image-generator")}>

<Image/>

{t("dashboard.create_image")}

</button>




<button onClick={()=>navigate("/campaigns")}>

<Megaphone/>

{t("dashboard.create_campaign")}

</button>




<button onClick={()=>navigate("/calendar")}>

<CalendarDays/>

{t("dashboard.calendar")}

</button>



</div>


</section>









<section className="system-card">


<h2>

<Activity/>

 AI System Status

</h2>



<div>

✅ Content Engine Ready

</div>


<div>

✅ Database Connected

</div>


<div>

🚀 Marketing Automation Active

</div>



</section>






</div>


);


}