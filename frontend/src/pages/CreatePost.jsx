import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { api } from "../api/api.js";

export default function CreatePost() {

  const [form, setForm] = useState({
    title: "",
    content: "",
    platform: "instagram",
    status: "draft",
  });

  const [topic, setTopic] = useState("");

  const [options, setOptions] = useState({
    field: "عام",
    goal: "زيادة التفاعل",
    content_type: "منشور",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleOptionChange = (e) => {
    setOptions({
      ...options,
      [e.target.name]: e.target.value,
    });
  };


  const handleGenerate = async () => {

    if (!topic) return;

    setLoading(true);
    setError("");

    try {

      const result = await api.generateContent({
        topic,
        platform: form.platform,
        field: options.field,
        goal: options.goal,
        content_type: options.content_type,
      });


      setForm({
        ...form,
        title: result.title,
        content: result.content,
      });


    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    try {

      await api.createPost(form);

      navigate("/");

    } catch (err) {

      setError(err.message);

    }

  };


  return (

    <div className="main">

      <Header title="إنشاء منشور جديد" />


      <div className="content">


        {error && (
          <p style={{color:"#DC2626"}}>
            {error}
          </p>
        )}



        <div className="post-card">

          <h3>
            ✨ توليد محتوى ذكي
          </h3>


          <input
            style={{
              width:"100%",
              padding:10,
              marginBottom:10
            }}
            placeholder="اكتب فكرة المنشور"
            value={topic}
            onChange={(e)=>setTopic(e.target.value)}
          />



          <select
            name="field"
            value={options.field}
            onChange={handleOptionChange}
          >

            <option value="عام">
              عام
            </option>

            <option value="مطاعم">
              مطاعم
            </option>

            <option value="حضانة">
              حضانة
            </option>

            <option value="عقارات">
              عقارات
            </option>

            <option value="خدمات">
              خدمات
            </option>

          </select>



          <select
            name="goal"
            value={options.goal}
            onChange={handleOptionChange}
          >

            <option>
              زيادة المبيعات
            </option>

            <option>
              زيادة التفاعل
            </option>

            <option>
              جذب العملاء
            </option>

            <option>
              بناء العلامة التجارية
            </option>

          </select>



          <select
            name="content_type"
            value={options.content_type}
            onChange={handleOptionChange}
          >

            <option>
              منشور
            </option>

            <option>
              إعلان
            </option>

            <option>
              عرض
            </option>

            <option>
              نصيحة
            </option>

          </select>



          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
          >

            {loading ? "جاري التوليد..." : "ولّد"}

          </button>


        </div>



        <form
          className="create-form post-card"
          onSubmit={handleSubmit}
        >


          <input
            name="title"
            placeholder="عنوان المنشور"
            value={form.title}
            onChange={handleChange}
            required
          />



          <textarea
            name="content"
            rows="7"
            placeholder="محتوى المنشور"
            value={form.content}
            onChange={handleChange}
            required
          />



          <select
            name="platform"
            value={form.platform}
            onChange={handleChange}
          >

            <option value="instagram">
              Instagram
            </option>

            <option value="facebook">
              Facebook
            </option>

            <option value="twitter">
              Twitter / X
            </option>

            <option value="linkedin">
              LinkedIn
            </option>

          </select>



          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >

            <option value="draft">
              مسودة
            </option>

            <option value="scheduled">
              مجدول
            </option>

            <option value="published">
              منشور
            </option>

          </select>



          <button type="submit">
            حفظ المنشور
          </button>


        </form>


      </div>


    </div>

  );

}