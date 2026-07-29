import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  PenSquare,
  Image,
  Brain,
  BarChart3,
  Settings,
  Sparkles,
  Library,
  Link2,
  Megaphone,
  CalendarDays,
  WandSparkles
} from "lucide-react";

import { useTranslation } from "react-i18next";


export default function Sidebar(){

const { t } = useTranslation();


const menu=[

{
name:t("sidebar.dashboard"),
path:"/",
icon:<LayoutDashboard size={20}/>
},

{
name:t("sidebar.create"),
path:"/create",
icon:<PenSquare size={20}/>
},

{
name:t("sidebar.images"),
path:"/image-generator",
icon:<Image size={20}/>
},

{
name:t("sidebar.promptGenerator"),
path:"/prompt-generator",
icon:<Brain size={20}/>
},

{
name:t("sidebar.promptLibrary"),
path:"/prompts",
icon:<Library size={20}/>
},

{
name:t("sidebar.campaigns"),
path:"/campaigns",
icon:<Megaphone size={20}/>
},

{
name:t("sidebar.calendar"),
path:"/calendar",
icon:<CalendarDays size={20}/>
},

{
name:t("sidebar.planner"),
path:"/planner",
icon:<WandSparkles size={20}/>
},

{
name:t("sidebar.analytics"),
path:"/analytics",
icon:<BarChart3 size={20}/>
},

{
name:t("sidebar.integrations"),
path:"/integrations",
icon:<Link2 size={20}/>
}

];


return(

<aside className="sidebar">


<div className="brand">


<div className="logo">

🚀

</div>


<div>

<h2>

BrandSocialNova

</h2>


<span>

<Sparkles size={14}/>

AI Marketing Platform

</span>


</div>


</div>




<div className="status">

🟢 AI Engine Online

</div>




<nav>

{

menu.map((item)=>(


<NavLink

key={item.path}

to={item.path}

className={({isActive})=>

isActive

?

"menu active"

:

"menu"

}

>


{item.icon}


<span>

{item.name}

</span>


</NavLink>


))


}


</nav>




<div className="settings">


<Settings size={20}/>


<span>

{t("sidebar.settings")}

</span>


</div>



</aside>


);

}