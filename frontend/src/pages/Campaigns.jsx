import { useEffect, useState } from "react";

import {
  Megaphone,
  Sparkles,
  Target,
  Layers,
} from "lucide-react";



export default function Campaigns(){


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

alert("اكتب اسم النشاط أولا");

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

alert("تم إنشاء الحملة بنجاح 🚀");


}

catch(error){

console.log(error);

alert("حدث خطأ");

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

`تم إنشاء ${data.count} منشورات بالذكاء الاصطناعي ✅`

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

📢 Campaign AI Builder

</h1>


<p>

إنشاء حملات تسويقية كاملة باستخدام الذكاء الاصطناعي

</p>


</div>







<div className="campaign-form">



<h2>

✨ إنشاء حملة جديدة

</h2>




<input

placeholder="اسم النشاط"

value={business}

onChange={e=>setBusiness(e.target.value)}

/>





<input

placeholder="المجال"

value={category}

onChange={e=>setCategory(e.target.value)}

/>





<input

placeholder="الهدف التسويقي"

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

placeholder="عدد المنشورات"

/>






<button

onClick={createCampaign}

disabled={loading}

>


<Megaphone size={20}/>


{

loading

?

"جاري الإنشاء..."

:

"إنشاء الحملة"

}


</button>



</div>








<h2>

📂 الحملات السابقة

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

 الهدف: {item.goal}

</p>





<p>

<Layers size={16}/>

 المجال: {item.category}

</p>





<p>

<Megaphone size={16}/>

 المنصة: {item.platform}

</p>







<button

onClick={()=>generateCampaign(item.id)}

>


<Sparkles size={18}/>


{

generating===item.id

?

"جاري التوليد..."

:

"إنشاء منشورات AI"

}



</button>




</div>


))


}



</div>






</div>


);


}