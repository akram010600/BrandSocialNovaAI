import { useState } from "react";


export default function PromptGenerator() {


  const [business, setBusiness] = useState("");
  const [category, setCategory] = useState("");
  const [goal, setGoal] = useState("");
  const [style, setStyle] = useState("");


  const [arabicPrompt, setArabicPrompt] = useState("");
  const [englishPrompt, setEnglishPrompt] = useState("");

  const [generatedImage, setGeneratedImage] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");




  async function generatePrompt(){


    setLoading(true);

    setMessage("");


    try{


      const response = await fetch(

        "http://127.0.0.1:8000/api/generate-prompt",

        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify({

            business,

            category,

            goal,

            style

          })

        }

      );



      const data = await response.json();



      setArabicPrompt(
        data.arabic_prompt || ""
      );


      setEnglishPrompt(
        data.english_prompt || ""
      );



    }

    catch(error){

      console.error(error);

      alert(
        "حدث خطأ أثناء إنشاء البرومت"
      );

    }

    finally{

      setLoading(false);

    }


  }





  async function savePrompt(){


    if(!arabicPrompt){

      alert(
        "أنشئ البرومت أولاً"
      );

      return;

    }



    try{


      const response = await fetch(

        "http://127.0.0.1:8000/api/save-prompt",

        {

          method:"POST",

          headers:{

            "Content-Type":"application/json"

          },

          body:JSON.stringify({

            business,

            category,

            goal,

            style,

            arabic_prompt:arabicPrompt,

            english_prompt:englishPrompt

          })

        }

      );



      const data = await response.json();



      setMessage(
        "✅ تم حفظ البرومت بنجاح"
      );



    }

    catch(error){

      console.error(error);

      alert(
        "حدث خطأ أثناء الحفظ"
      );

    }


  }





  async function generateImage(){


    if(!englishPrompt){

      alert(
        "أنشئ البرومت أولاً"
      );

      return;

    }



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

            prompt:englishPrompt

          })

        }

      );



      const data = await response.json();



      if(data.image){


        setGeneratedImage(

          "http://127.0.0.1:8000" + data.image

        );

      }


    }

    catch(error){

      console.error(error);

      alert(
        "حدث خطأ أثناء إنشاء الصورة"
      );

    }

    finally{

      setLoading(false);

    }


  }






  function copyText(text){


    navigator.clipboard.writeText(text);


    alert(
      "تم نسخ البرومت ✅"
    );


  }





  function clearAll(){


    setArabicPrompt("");

    setEnglishPrompt("");

    setGeneratedImage("");

    setMessage("");

  }





  return (


    <div className="page">


      <h1>
        🧠 مولد البرومت الذكي
      </h1>



      <input

        placeholder="اسم النشاط"

        value={business}

        onChange={
          e=>setBusiness(e.target.value)
        }

      />



      <input

        placeholder="المجال"

        value={category}

        onChange={
          e=>setCategory(e.target.value)
        }

      />



      <input

        placeholder="الهدف التسويقي"

        value={goal}

        onChange={
          e=>setGoal(e.target.value)
        }

      />



      <input

        placeholder="أسلوب التصميم"

        value={style}

        onChange={
          e=>setStyle(e.target.value)
        }

      />



      <br/><br/>



      <button onClick={generatePrompt}>

        {loading ?

        "⏳ جاري الإنشاء..."

        :

        "🧠 إنشاء البرومت"

        }

      </button>



      <hr/>




      <h3>
        🇸🇦 البرومت العربي
      </h3>


      <textarea

        rows="10"

        value={arabicPrompt}

        readOnly

        style={{
          width:"100%"
        }}

      />



      <button

        onClick={()=>copyText(arabicPrompt)}

        disabled={!arabicPrompt}

      >

        📋 نسخ العربي

      </button>



      <button

        onClick={savePrompt}

        disabled={!arabicPrompt}

      >

        💾 حفظ البرومت

      </button>




      <hr/>




      <h3>
        🇬🇧 English Prompt
      </h3>



      <textarea

        rows="10"

        value={englishPrompt}

        readOnly

        style={{
          width:"100%"
        }}

      />



      <button

        onClick={()=>copyText(englishPrompt)}

        disabled={!englishPrompt}

      >

        📋 Copy English

      </button>




      <hr/>




      <h3>
        🎨 إنشاء صورة AI
      </h3>



      <button

        onClick={generateImage}

        disabled={!englishPrompt || loading}

      >

        🎨 إنشاء الصورة

      </button>





      {
        message &&

        <h3>
          {message}
        </h3>
      }





      {
        generatedImage &&

        <img

          src={generatedImage}

          alt="AI"

          style={{

            width:"500px",

            maxWidth:"100%",

            borderRadius:"20px"

          }}

        />

      }





      <br/><br/>



      <button onClick={clearAll}>

        🗑️ مسح

      </button>



    </div>


  );


}