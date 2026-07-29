import { useTranslation } from "react-i18next";
import { Globe2, Bell } from "lucide-react";


export default function Header({ title }) {


  const { i18n } = useTranslation();



  const changeLanguage = () => {

    const newLanguage =
      i18n.language === "ar" ? "en" : "ar";

    i18n.changeLanguage(newLanguage);

  };



  return (

    <header className="header">


      <div>

        <h1 style={{ fontSize: 22 }}>
          {title}
        </h1>

        <div style={{
          fontSize: 14,
          color:"#6B7280"
        }}>
          مرحبًا 👋
        </div>

      </div>




      <div style={{
        display:"flex",
        alignItems:"center",
        gap:"12px"
      }}>


        <button
          onClick={changeLanguage}
          style={{
            display:"flex",
            alignItems:"center",
            gap:"6px",
            padding:"8px 14px",
            borderRadius:"10px",
            border:"1px solid #E5E7EB",
            background:"#fff",
            cursor:"pointer"
          }}
        >

          <Globe2 size={18}/>

          {i18n.language === "ar"
            ? "English"
            : "العربية"
          }

        </button>



        <button
          style={{
            width:"38px",
            height:"38px",
            borderRadius:"50%",
            border:"1px solid #E5E7EB",
            background:"#fff",
            cursor:"pointer"
          }}
        >

          <Bell size={18}/>

        </button>



      </div>


    </header>

  );

}