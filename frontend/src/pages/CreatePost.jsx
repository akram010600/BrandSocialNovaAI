import { useState } from "react";

import {
  Sparkles,
  Wand2,
  Save
} from "lucide-react";



export default function CreatePost(){


const [business,setBusiness]=useState("");

const [category,setCategory]=useState("");

const [goal,setGoal]=useState("");

const [postType,setPostType]=useState("");

const [platform,setPlatform]=useState("facebook");


const [result,setResult]=useState(null);

const [loading,setLoading]=useState(false);





async function generate(){


setLoading(true);


try{


const response = await fetch(

"http://127.0.0.1:8000/api/generate",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

business,

category,

goal,

post_type:postType,

platform

})


}

);



const data = await response.json();


setResult(data);


}

catch(error){

console.log(error);

alert("حدث خطأ");

}

finally{

setLoading(false);

}


}






return(


<div className="page">


<h1>

✨ AI Content Studio

</h1>


<p>

إنشاء محتوى تسويقي احترافي بالذكاء الاصطناعي

</p>





<div className="form-card">


<input

placeholder="اسم النشاط"

value={business}

onChange={e=>setBusiness(e.target.value)}

/>



<input

placeholder="المجال مثال: مطعم، حضانة، عقارات"

value={category}

onChange={e=>setCategory(e.target.value)}

/>




<input

placeholder="الهدف التسويقي"

value={goal}

onChange={e=>setGoal(e.target.value)}

/>




<select

value={postType}

onChange={e=>setPostType(e.target.value)}

>


<option>

نوع المنشور

</option>


<option>

إعلان عرض

</option>


<option>

منشور تعريفي

</option>


<option>

زيادة تفاعل

</option>


<option>

بناء ثقة

</option>


</select>





<select

value={platform}

onChange={e=>setPlatform(e.target.value)}

>


<option value="facebook">

Facebook

</option>


<option value="instagram">

Instagram

</option>


<option value="linkedin">

LinkedIn

</option>


</select>





<button

onClick={generate}

>


{

loading ?

"⏳ جاري الإنشاء..."

:

<>

<Wand2 size={20}/>

إنشاء المحتوى AI

</>

}


</button>



</div>







{

result &&

<div className="result-card">


<h2>

{result.title}

</h2>


<p>

{result.content}

</p>



<img

src={
"http://127.0.0.1:8000"+result.image
}

style={{

width:"400px",

borderRadius:"20px"

}}


/>



<br/>


<button>


<Save size={18}/>

حفظ المنشور

</button>



</div>


}



</div>


);


}