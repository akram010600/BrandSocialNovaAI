import {
  Palette,
  Image,
  Pin,
  Globe,
  Camera,
  CheckCircle,
  Store
} from "lucide-react";

import { useTranslation } from "react-i18next";


export default function Integrations(){

const { t } = useTranslation();


const services = [

{
name:"Canva",
icon:<Palette size={40}/>,
desc:t("integrations.canva")
},

{
name:"Freepik",
icon:<Image size={40}/>,
desc:t("integrations.freepik")
},

{
name:"Pinterest",
icon:<Pin size={40}/>,
desc:t("integrations.pinterest")
},

{
name:"Meta Facebook",
icon:<Globe size={40}/>,
desc:t("integrations.facebook")
},

{
name:"Instagram",
icon:<Camera size={40}/>,
desc:t("integrations.instagram")
},

{
name:"Google Business",
icon:<Store size={40}/>,
desc:t("integrations.google")
}

];


return(

<div className="page">

<h1>
🔗 {t("integrations.title")}
</h1>

<p>
{t("integrations.subtitle")}
</p>


<div className="integration-grid">

{
services.map((item,index)=>(

<div
className="integration-card"
key={index}
>

<div className="integration-icon">
{item.icon}
</div>


<h2>
{item.name}
</h2>


<p>
{item.desc}
</p>


<button>

<CheckCircle size={18}/>

{t("integrations.button")}

</button>


</div>

))
}

</div>

</div>

);

}