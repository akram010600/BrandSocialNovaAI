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
  BarChart3
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";



export default function Dashboard(){


const navigate = useNavigate();

const { t } = useTranslation();



const [stats,setStats] = useState({

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
icon:<FileText size={28}/>
},


{
title:t("dashboard.published_posts"),
value:stats.published_posts,
icon:<Sparkles size={28}/>
},


{
title:t("dashboard.likes"),
value:stats.total_likes,
icon:<Heart size={28}/>
},


{
title:t("dashboard.comments"),
value:stats.total_comments,
icon:<MessageCircle size={28}/>
},


{
title:t("dashboard.shares"),
value:stats.total_shares,
icon:<Share2 size={28}/>
}


];





const tools=[

{
title:t("dashboard.create_post"),
icon:<PenSquare/>,
path:"/create"
},


{
title:t("dashboard.create_image"),
icon:<Image/>,
path:"/image-generator"
},


{
title:t("dashboard.create_campaign"),
icon:<Megaphone/>,
path:"/campaigns"
},


{
title:t("dashboard.calendar"),
icon:<CalendarDays/>,
path:"/calendar"
}

];





return(

<div className="page dashboard">



<div className="dashboard-header">


<h1>

🚀 BrandSocialNova AI

</h1>


<p>

{t("dashboard.title")}

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

⚡ {t("dashboard.ai_tools")}

</h2>



<div className="quick-grid">


{

tools.map((tool,index)=>(


<button

key={index}

onClick={()=>navigate(tool.path)}

>


{tool.icon}


<span>

{tool.title}

</span>


</button>


))


}


</div>


</div>








<div className="ai-status">


<h2>

🤖 {t("dashboard.system_status")}

</h2>


<p>

🟢 {t("dashboard.engine")}

</p>


<p>

✅ {t("dashboard.database")}

</p>


<p>

🚀 {t("dashboard.ready")}

</p>


</div>






</div>


);


}