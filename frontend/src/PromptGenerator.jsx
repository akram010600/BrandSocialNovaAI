import { useState } from "react";

export default function PromptGenerator() {

  const [business, setBusiness] = useState("");
  const [category, setCategory] = useState("");
  const [goal, setGoal] = useState("");
  const [style, setStyle] = useState("");

  const [arabicPrompt, setArabicPrompt] = useState("");
  const [englishPrompt, setEnglishPrompt] = useState("");

  async function generatePrompt() {

    const response = await fetch("http://127.0.0.1:8000/api/generate-prompt", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        business,

        category,

        goal,

        style

      })

    });

    const data = await response.json();

    setArabicPrompt(data.arabic_prompt);

    setEnglishPrompt(data.english_prompt);

  }

  return (

    <div className="page">

      <h1>🧠 إنشاء برومت</h1>

      <input
        placeholder="اسم النشاط"
        value={business}
        onChange={(e) => setBusiness(e.target.value)}
      />

      <input
        placeholder="المجال"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        placeholder="الهدف"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />

      <input
        placeholder="ستايل التصميم"
        value={style}
        onChange={(e) => setStyle(e.target.value)}
      />

      <br /><br />

      <button onClick={generatePrompt}>
        توليد البرومت
      </button>

      <h2>البرومت العربي</h2>

      <textarea
        rows={10}
        value={arabicPrompt}
        readOnly
      />

      <h2>English Prompt</h2>

      <textarea
        rows={10}
        value={englishPrompt}
        readOnly
      />

    </div>

  );

}