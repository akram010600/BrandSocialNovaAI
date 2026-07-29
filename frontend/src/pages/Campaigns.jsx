import { useEffect, useState } from "react";

import {
  Megaphone,
  Sparkles,
  Target,
  Layers,
} from "lucide-react";

import { useTranslation } from "react-i18next";



export default function Campaigns(){


const { t } = useTranslation();


const [campaigns,setCampaigns]=useState([]);

const [business,setBusiness]=useState("");

const [category,setCategory]=useState("");

const [goal,setGoal]=useState("");

const [platform,setPlatform]=useState("Megaphone");

const [postsCount,setPostsCount]=useState(5);

const [loading,setLoading]=useState(false);

const [generating,setGenerating]=useState(null);







async function loadCampaigns(){


try{


const response = await fetch(

"http://127.0.0.1:8000/api/campaigns"

);


const data = await response.json();


setCampaigns(data);


}

catch(error){

console.log(error);

}


}








async function createCampaign(){


if(!business){

alert(t("campaigns.write_business"));

return;

}



setLoading(true);


try{


await fetch(

"http://127.0.0.1:8000/api/campaigns",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

business,

category,

goal,

platform,

posts_count:postsCount,

status:"draft"

})


}

);




await loadCampaigns();


setBusiness("");

setCategory("");

setGoal("");


alert(t("campaigns.success"));


}

catch(error){

console.log(error);

alert(t("campaigns.error"));

}


finally{

setLoading(false);

}


}









async function generateCampaign(id){


setGenerating(id);


try{


const response = await fetch(

`http://127.0.0.1:8000/api/campaigns/${id}/generate`,

{

method:"POST"

}

);




const data = await response.json();



alert(

t("campaigns.generated",{count:data.count})

);



}

catch(error){

console.log(error);

}


finally{

setGenerating(null);

}


}








useEffect(()=>{


loadCampaigns();


},[]);









return(


<div className="page">






<div className="campaign-header">


<h1>

{t("campaigns.title")}

</h1>



<p>

{t("campaigns.subtitle")}

</p>


</div>








<div className="campaign-form">



<h2>

{t("campaigns.create_title")}

</h2>





<input

placeholder={t("campaigns.business")}

value={business}

onChange={e=>setBusiness(e.target.value)}

/>






<input

placeholder={t("campaigns.category")}

value={category}

onChange={e=>setCategory(e.target.value)}

/>






<input

placeholder={t("campaigns.goal")}

value={goal}

onChange={e=>setGoal(e.target.value)}

/>







<select

value={platform}

onChange={e=>setPlatform(e.target.value)}

>


<option value="Megaphone">

Megaphone

</option>


<option value="instagram">

Instagram

</option>


<option value="linkedin">

LinkedIn

</option>


</select>







<input

type="number"

value={postsCount}

onChange={e=>setPostsCount(e.target.value)}

placeholder={t("campaigns.posts_count")}

/>







<button

onClick={createCampaign}

disabled={loading}

>



<Megaphone size={20}/>



{

loading

?

t("campaigns.loading")

:

t("campaigns.create")

}



</button>




</div>









<h2>

{t("campaigns.previous")}

</h2>









<div className="campaign-grid">



{

campaigns.map(item=>(



<div

className="campaign-card"

key={item.id}

>




<div className="campaign-icon">

<Megaphone size={35}/>

</div>





<h2>

{item.business}

</h2>






<p>

<Target size={16}/>

 {t("campaigns.target")}: {item.goal}

</p>







<p>

<Layers size={16}/>

 {t("campaigns.field")}: {item.category}

</p>







<p>

<Megaphone size={16}/>

 {t("campaigns.platform")}: {item.platform}

</p>







<button

onClick={()=>generateCampaign(item.id)}

>

<Sparkles size={18}/>




{

generating===item.id

?

t("campaigns.generating")

:

t("campaigns.generate")

}




</button>






</div>



))


}



</div>








</div>


);


}