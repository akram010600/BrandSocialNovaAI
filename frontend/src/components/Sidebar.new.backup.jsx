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
  CalendarDays
} from "lucide-react";

import { useTranslation } from "react-i18next";


export default function Sidebar(){

const { t } = useTranslation();


const menu = [

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
name:t("sidebar.ai"),
path:"/prompt-generator",
icon:<Brain size={20}/>
},

{
name:t("sidebar.library"),
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
name:t("sidebar.analytics"),
path:"/analytics",
icon:<BarChart3 size={20}/>
},

{
name:t("sidebar.integrations"),
path:"/integrations",
icon:<Link2 size={20}/>
},

{
name:t("sidebar.settings"),
path:"/settings",
icon:<Settings size={20}/>
}

];


return (

<aside className="sidebar">

<div className="logo">

<Sparkles size={28}/>

<h2>
BrandSocialNova AI
</h2>

</div>


<nav>

{
menu.map((item,index)=>(

<NavLink
key={index}
to={item.path}
className={({isActive}) =>
isActive ? "active" : ""
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

</aside>

);

}