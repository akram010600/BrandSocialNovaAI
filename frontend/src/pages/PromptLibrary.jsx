import { useEffect, useState } from "react";


export default function PromptLibrary(){


  const [prompts,setPrompts] = useState([]);

  const [loading,setLoading] = useState(false);



  async function loadPrompts(){


    setLoading(true);


    try{


      const response = await fetch(
        "http://127.0.0.1:8000/api/prompts"
      );


      if(!response.ok){

        throw new Error("API Error");

      }


      const data = await response.json();


      setPrompts(data);


    }

    catch(error){


      console.error(error);


      alert(
        "تعذر تحميل مكتبة البرومبتات"
      );


    }

    finally{


      setLoading(false);


    }


  }







  async function deletePrompt(id){


    const confirmDelete =
    window.confirm(
      "هل تريد حذف هذا البرومت؟"
    );


    if(!confirmDelete){

      return;

    }




    try{


      const response = await fetch(

        `http://127.0.0.1:8000/api/prompts/${id}`,

        {

          method:"DELETE"

        }

      );



      if(response.ok){

        loadPrompts();

      }



    }

    catch(error){


      console.error(error);


      alert(
        "فشل الحذف"
      );


    }


  }







  function copyText(text){


    navigator.clipboard.writeText(text);


    alert(
      "تم نسخ البرومت ✅"
    );


  }







  useEffect(()=>{


    loadPrompts();


  },[]);








return(


<div 
className="page"
dir="rtl"
>


<h1>
📚 مكتبة البرومبتات
</h1>



<div>


<h3>

عدد البرومبتات:
{prompts.length}

</h3>



<button
onClick={loadPrompts}
>

🔄 تحديث

</button>


</div>



<hr/>





{
loading &&

<h3>
⏳ جاري تحميل البيانات...
</h3>

}







{
!loading && prompts.length===0 &&

<h3>
لا توجد برومبتات محفوظة حاليا
</h3>

}








{

prompts.map((item)=>(



<div

key={item.id}

style={{

background:"#fff",

padding:"25px",

marginBottom:"25px",

borderRadius:"20px",

boxShadow:"0 5px 20px rgba(0,0,0,.08)"

}}

>




<h2>
🚀 {item.business}
</h2>




<p>
📌 المجال:
{item.category}
</p>



<p>
🎯 الهدف:
{item.goal}
</p>



<p>
🎨 الأسلوب:
{item.style}
</p>







<h3>
🇸🇦 البرومت العربي
</h3>



<textarea

value={item.arabic_prompt}

readOnly

rows="8"

style={{

width:"100%",

direction:"rtl"

}}


/>




<br/>


<button

onClick={()=>copyText(item.arabic_prompt)}

>

📋 نسخ العربي

</button>








<hr/>






<h3>
🇬🇧 English Prompt
</h3>




<textarea

value={item.english_prompt}

readOnly

rows="8"

style={{

width:"100%"

}}


/>





<br/>


<button

onClick={()=>copyText(item.english_prompt)}

>

📋 Copy English

</button>






<br/>
<br/>





<button

onClick={()=>deletePrompt(item.id)}

style={{

background:"#d9534f",

color:"#fff"

}}

>

🗑️ حذف البرومت

</button>





</div>



))


}






</div>


);


}