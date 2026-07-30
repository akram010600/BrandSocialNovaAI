import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api.js";


export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);



  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);
    setMessage("");


    try {

      const response = await api.login({
        email,
        password,
      });



      localStorage.setItem(
        "token",
        response.access_token
      );


      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );



      setMessage("✅ تم تسجيل الدخول بنجاح");


      setTimeout(() => {

        navigate("/");

      }, 1000);



    } catch (error) {


      setMessage(
        error.message || "فشل تسجيل الدخول"
      );


    } finally {


      setLoading(false);


    }

  };



  return (

    <div
      style={{
        width: "400px",
        margin: "80px auto",
        padding: "30px",
        boxShadow: "0 0 20px #ddd",
        borderRadius: "12px",
        direction: "rtl"
      }}
    >


      <h2 style={{textAlign:"center"}}>
        تسجيل الدخول
      </h2>



      <form onSubmit={handleLogin}>


        <input

          type="email"

          placeholder="البريد الإلكتروني"

          value={email}

          onChange={(e)=>setEmail(e.target.value)}

          style={{

            width:"100%",

            padding:"12px",

            marginBottom:"15px",

            borderRadius:"8px",

            border:"1px solid #ccc"

          }}

        />




        <input

          type="password"

          placeholder="كلمة المرور"

          value={password}

          onChange={(e)=>setPassword(e.target.value)}

          style={{

            width:"100%",

            padding:"12px",

            marginBottom:"15px",

            borderRadius:"8px",

            border:"1px solid #ccc"

          }}

        />





        <button

          type="submit"

          disabled={loading}

          style={{

            width:"100%",

            padding:"12px",

            borderRadius:"8px",

            cursor:"pointer"

          }}

        >


          {loading ? "جاري الدخول..." : "دخول"}


        </button>



      </form>




      <p style={{
        textAlign:"center",
        marginTop:"20px"
      }}>

        {message}

      </p>



    </div>

  );

}