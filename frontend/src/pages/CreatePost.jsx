import { useState } from "react";

import {
  Wand2,
  Save,
  Copy,
  Sparkles
} from "lucide-react";

import { useTranslation } from "react-i18next";


export default function CreatePost(){

const { t } = useTranslation();


const [business,setBusiness]=useState("");
const [category,setCategory]=useState("");
const [goal,setGoal]=useState("");
const [postType,setPostType]=useState("");
const [platform,setPlatform]=useState("facebook");
const [style,setStyle]=useState("creative");

const [result,setResult]=useState(null);
const [loading,setLoading]=useState(false);



async function generate(){

if(!business){
alert("اكتب اسم النشاط أولا");
return;
}


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

platform,

style

})

}

);



const data = await response.json();


setResult(data);


}

catch(error){

console.error(error);

alert("حدث خطأ أثناء إنشاء المحتوى");

}

finally{

setLoading(false);

}


}




function copyContent(){

navigator.clipboard.writeText(
result.content
);

alert("تم نسخ المحتوى ✅");

}




return(

<div className="page">


<div className="hero">

<div>

<h1>
✨ {t("create.title")}
</h1>

<p>
{t("create.subtitle")}
</p>

</div>


<div className="ai-badge">

🟢 AI Content Engine

</div>


</div>





<div className="form-card">


<h2>

<Sparkles size={22}/>

إنشاء منشور ذكي

</h2>




<input

placeholder={t("create.business")}

value={business}

onChange={(e)=>setBusiness(e.target.value)}

/>




<input

placeholder={t("create.category")}

value={category}

onChange={(e)=>setCategory(e.target.value)}

/>




<input

placeholder={t("create.goal")}

value={goal}

onChange={(e)=>setGoal(e.target.value)}

/>





<select

value={postType}

onChange={(e)=>setPostType(e.target.value)}

>

<option value="">
نوع المحتوى
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

onChange={(e)=>setPlatform(e.target.value)}

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






<select

value={style}

onChange={(e)=>setStyle(e.target.value)}

>


<option value="creative">
إبداعي
</option>


<option value="professional">
احترافي
</option>


<option value="sales">
بيعي
</option>


<option value="friendly">
ودّي
</option>


</select>







<button

onClick={generate}

disabled={loading}

>


<Wand2 size={20}/>


{

loading

?

"⏳ جاري إنشاء المحتوى..."

:

t("create.generate")

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




{

result.image &&

<img

src={
"http://127.0.0.1:8000"+result.image
}

style={{

width:"100%",

maxWidth:"500px",

borderRadius:"20px"

}}

/>

}




<div>


<button onClick={copyContent}>

<Copy size={18}/>

نسخ

</button>



<button>

<Save size={18}/>

حفظ المنشور

</button>


</div>




</div>


}



</div>


);


}