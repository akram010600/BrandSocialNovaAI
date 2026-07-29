import { useState } from "react";

import {
  Image,
  Sparkles
} from "lucide-react";



export default function ImageGenerator(){


const [business,setBusiness]=useState("");

const [category,setCategory]=useState("");

const [style,setStyle]=useState("");

const [prompt,setPrompt]=useState("");

const [image,setImage]=useState("");

const [loading,setLoading]=useState(false);





async function generateImage(){


setLoading(true);


try{


const response = await fetch(

"http://127.0.0.1:8000/api/generate-ai-image",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

title:business,

prompt:

`

Create professional social media design.

Business:
${business}

Category:
${category}

Style:
${style}

Details:
${prompt}

High quality,
modern marketing design,
Facebook and Instagram ready.

`

})

}

);



const data = await response.json();


if(data.image){

setImage(

"http://127.0.0.1:8000"+data.image

);

}


}

catch(error){

console.log(error);

alert("حدث خطأ أثناء إنشاء الصورة");

}


finally{

setLoading(false);

}


}





return(


<div className="page">


<h1>

🎨 AI Design Center

</h1>


<p>

إنشاء تصاميم إعلانية احترافية بالذكاء الاصطناعي

</p>






<div className="form-card">



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





<select

value={style}

onChange={e=>setStyle(e.target.value)}

>


<option>

اختر أسلوب التصميم

</option>


<option>

Luxury Premium

</option>


<option>

Modern

</option>


<option>

Minimal

</option>


<option>

Kids Colorful

</option>


</select>






<textarea

placeholder="وصف التصميم"

rows="5"

value={prompt}

onChange={e=>setPrompt(e.target.value)}

></textarea>





<button

onClick={generateImage}

disabled={loading}

>


<Sparkles size={20}/>


{

loading ?

"جاري التصميم..."

:

"إنشاء تصميم AI"

}



</button>




</div>








{

image &&


<div className="result-card">


<h2>

🖼️ التصميم الناتج

</h2>



<img

src={image}

alt="AI"

style={{

width:"500px",

maxWidth:"100%",

borderRadius:"25px"

}}


/>




<br/><br/>



<button>

🎨 تعديل في Canva

</button>


<button>

📌 نشر Pinterest

</button>



</div>



}



</div>


);


}