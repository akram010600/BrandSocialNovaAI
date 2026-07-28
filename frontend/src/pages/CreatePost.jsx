import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { api } from "../api/api.js";


export default function CreatePost() {


  const [form, setForm] = useState({

    title: "",
    content: "",
    platform: "facebook",
    status: "draft",

  });



  const [data, setData] = useState({

    business: "",
    category: "تعليم",
    goal: "زيادة العملاء",
    post_type: "منشور تعريفي",
    platform: "facebook",

  });



  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();



  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };



  const handleDataChange = (e) => {

    setData({

      ...data,

      [e.target.name]: e.target.value

    });

  };



  const handleGenerate = async () => {


    if (!data.business.trim()) {

      setError("اكتب اسم النشاط أولاً");

      return;

    }



    setLoading(true);

    setError("");



    try {


      const result = await api.generateContent(data);



      setForm({

        ...form,

        title: result.title,

        content: result.content,

        platform: data.platform

      });



    } catch(err) {


      setError(err.message);


    } finally {


      setLoading(false);


    }


  };




  const handleSubmit = async(e)=>{


    e.preventDefault();


    if(!form.title || !form.content){

      setError("قم بتوليد المحتوى أولاً");

      return;

    }



    try{


      await api.createPost(form);


      navigate("/");


    }catch(err){


      setError(err.message);


    }


  };




return (

<div className="main">


<Header title="إنشاء منشور جديد"/>



<div className="content">



{error && (

<p style={{color:"red"}}>

{error}

</p>

)}




<div className="post-card">


<h3>
✨ إعداد الحملة الذكية
</h3>



<input

name="business"

placeholder="اسم النشاط مثال: مدرسة النخبة"

value={data.business}

onChange={handleDataChange}

/>



<select

name="category"

value={data.category}

onChange={handleDataChange}

>

<option>تعليم</option>

<option>حضانة</option>

<option>مطاعم</option>

<option>عقارات</option>

<option>خدمات</option>


</select>



<select

name="goal"

value={data.goal}

onChange={handleDataChange}

>


<option>زيادة العملاء</option>

<option>زيادة المبيعات</option>

<option>بناء الثقة</option>

<option>زيادة التسجيل</option>


</select>



<select

name="post_type"

value={data.post_type}

onChange={handleDataChange}

>


<option>منشور تعريفي</option>

<option>إعلان عرض</option>

<option>خصم</option>

<option>نصيحة</option>


</select>




<select

name="platform"

value={data.platform}

onChange={handleDataChange}

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

onClick={handleGenerate}

disabled={loading}

>


{loading ? "جاري الإنشاء..." : "✨ توليد المحتوى"}


</button>


</div>





<form

className="create-form post-card"

onSubmit={handleSubmit}

>



<input

name="title"

placeholder="العنوان"

value={form.title}

onChange={handleChange}

/>



<textarea

name="content"

rows="8"

placeholder="المحتوى"

value={form.content}

onChange={handleChange}

/>




<select

name="platform"

value={form.platform}

onChange={handleChange}

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




<button>

حفظ المنشور

</button>


</form>



</div>


</div>

);


}