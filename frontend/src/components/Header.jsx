import { useTranslation } from "react-i18next";
import { Globe2, Bell } from "lucide-react";


export default function Header({ title }) {


const { t, i18n } = useTranslation();



function changeLanguage(){

const newLanguage =
i18n.language === "ar" ? "en" : "ar";

i18n.changeLanguage(newLanguage);

}




return (


<header className="header">


<div className="header-info">


<h1>

{title || t("header.brand")}

</h1>


<p>

{t("header.welcome")}

</p>


</div>





<div className="header-actions">



<button

className="language-btn"

onClick={changeLanguage}

>


<Globe2 size={18}/>


<span>

{
i18n.language === "ar"
?
"English"
:
"العربية"
}

</span>


</button>





<button

className="notification-btn"

>

<Bell size={18}/>

</button>



</div>



</header>


);


}