import { useState } from "react";

import {
  Wand2,
  Save
} from "lucide-react";

import { useTranslation } from "react-i18next";



export default function CreatePost(){


const { t } = useTranslation();



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

alert(t("createPost.error"));

}

finally{

setLoading(false);

}


}







return(


<div className="page">



<h1>

{t("createPost.title")}

</h1>



<p>

{t("createPost.subtitle")}

</p>






<div className="form-card">



<input

placeholder={t("createPost.business")}

value={business}

onChange={e=>setBusiness(e.target.value)}

/>





<input

placeholder={t("createPost.category")}

value={category}

onChange={e=>setCategory(e.target.value)}

/>






<input

placeholder={t("createPost.goal")}

value={goal}

onChange={e=>setGoal(e.target.value)}

/>







<select

value={postType}

onChange={e=>setPostType(e.target.value)}

>


<option value="">

{t("createPost.post_type")}

</option>


<option>

{t("createPost.offer")}

</option>


<option>

{t("createPost.intro")}

</option>


<option>

{t("createPost.engagement")}

</option>


<option>

{t("createPost.trust")}

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

loading

?

t("createPost.loading")

:

<>

<Wand2 size={20}/>

{t("createPost.create")}

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





{

result.image &&

<img

src={"http://127.0.0.1:8000"+result.image}

style={{

width:"400px",

borderRadius:"20px"

}}


/>

}





<br/>





<button>


<Save size={18}/>

{t("createPost.save")}

</button>




</div>


}





</div>


);


}