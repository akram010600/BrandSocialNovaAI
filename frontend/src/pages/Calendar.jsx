import { useEffect, useState } from "react";
import {
  Copy,
  CalendarDays,
  CheckCircle
} from "lucide-react";


export default function Calendar(){


const [plans,setPlans]=useState([]);

const [loading,setLoading]=useState(true);



async function loadCalendar(){

try{

const res = await fetch(
"http://127.0.0.1:8000/api/calendar"
);


const data = await res.json();

setPlans(data);


}
catch(error){

console.error(error);

}
finally{

setLoading(false);

}

}




useEffect(()=>{

loadCalendar();

},[]);





function copyContent(text){

navigator.clipboard.writeText(text);

alert("تم نسخ المحتوى ✅");

}





function getColor(type){


if(type.includes("عرض"))
return "offer";


if(type.includes("تفاعلي"))
return "interactive";


if(type.includes("ثقة"))
return "trust";


return "info";


}






return(

<div className="page">


<div className="calendar-header">


<h1>

<CalendarDays />

تقويم المحتوى الذكي

</h1>


<p>

إدارة وجدولة منشورات BrandSocialNova AI

</p>


</div>






{

loading ?

<h3>
⏳ جاري التحميل...
</h3>


:


<div className="calendar-grid">


{

plans.map(item=>(


<div

key={item.id}

className={`content-card ${getColor(item.content_type)}`}

>


<div className="card-top">


<span>

اليوم {item.day}

</span>


<CheckCircle size={18}/>


</div>




<h2>

{item.title}

</h2>




<div className="type">

{item.content_type}

</div>





<p>

{item.content}

</p>





<button

onClick={()=>copyContent(item.content)}

>

<Copy size={16}/>

نسخ المحتوى

</button>





</div>


))


}


</div>


}



</div>


);


}