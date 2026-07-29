import { useState } from "react";


export default function ContentPlanner(){


const [business,setBusiness]=useState("");

const [category,setCategory]=useState("");

const [goal,setGoal]=useState("");

const [days,setDays]=useState(30);


const [plan,setPlan]=useState([]);

const [loading,setLoading]=useState(false);





async function generatePlan(){


setLoading(true);


try{


const response = await fetch(

"http://127.0.0.1:8000/api/content-plan",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

business,

category,

goal,

days:Number(days)

})


}

);



const data = await response.json();


setPlan(data.plan || []);



}

catch(error){


console.error(error);

alert(
"حدث خطأ أثناء إنشاء الخطة"
);


}

finally{


setLoading(false);


}


}





return(


<div className="page">


<h1>
✨ AI Content Planner
</h1>


<p>
إنشاء خطة محتوى ذكية باستخدام الذكاء الاصطناعي
</p>



<input

placeholder="اسم النشاط"

value={business}

onChange={(e)=>setBusiness(e.target.value)}

/>



<input

placeholder="المجال"

value={category}

onChange={(e)=>setCategory(e.target.value)}

/>



<input

placeholder="الهدف التسويقي"

value={goal}

onChange={(e)=>setGoal(e.target.value)}

/>



<input

type="number"

value={days}

onChange={(e)=>setDays(e.target.value)}

/>



<button

onClick={generatePlan}

disabled={loading}

>


{

loading

?

"⏳ جاري إنشاء الخطة..."

:

"🚀 إنشاء خطة المحتوى"

}


</button>





<hr/>





{

plan.map((item)=>(


<div

key={item.day}

style={{

border:"1px solid #ddd",

padding:"20px",

margin:"15px 0",

borderRadius:"15px"

}}

>


<h2>

📅 اليوم {item.day}

</h2>


<h3>

{item.type}

</h3>


<h4>

{item.title}

</h4>



<p>

{item.content}

</p>



</div>


))


}




</div>


);


}