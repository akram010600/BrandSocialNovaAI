import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Sparkles, CalendarDays } from "lucide-react";


export default function ContentPlanner() {


  const { t } = useTranslation();


  const [business, setBusiness] = useState("");
  const [category, setCategory] = useState("");
  const [goal, setGoal] = useState("");
  const [days, setDays] = useState(30);

  const [plan, setPlan] = useState([]);

  const [loading, setLoading] = useState(false);




  async function generatePlan() {


    setLoading(true);


    try {


      const response = await fetch(
        "http://127.0.0.1:8000/api/content-plan",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            business,

            category,

            goal,

            days: Number(days)

          })

        }
      );



      const data = await response.json();


      setPlan(data.plan || []);



    }

    catch(error) {


      console.error(error);

      alert("حدث خطأ أثناء إنشاء الخطة");


    }

    finally {


      setLoading(false);


    }


  }





  return (

    <div className="page">


      <div className="planner-header">


        <h1>

          <Sparkles size={28}/>

          {t("planner.title")}

        </h1>


        <p>

          {t("planner.subtitle")}

        </p>


      </div>





      <div className="form-card">


        <input

          placeholder={t("create.business")}

          value={business}

          onChange={(e)=>setBusiness(e.target.value)}

        />



        <input

          placeholder={t("create.category")}

          value={category}

          onChange={(e)=>setCategory(e.target.value)}

        />



        <input

          placeholder={t("create.goal")}

          value={goal}

          onChange={(e)=>setGoal(e.target.value)}

        />



        <input

          type="number"

          value={days}

          min="1"

          max="365"

          onChange={(e)=>setDays(e.target.value)}

        />





        <button

          onClick={generatePlan}

          disabled={loading}

        >


          {

            loading

            ?

            "⏳ جاري إنشاء الخطة..."

            :

            <>

              🚀 {t("planner.generate")}

            </>


          }


        </button>



      </div>







      {

        plan.length > 0 &&

        <div className="planner-results">


          {

            plan.map((item)=>(


              <div

                key={item.day}

                className="content-card"

              >


                <div className="card-top">


                  <span>

                    <CalendarDays size={18}/>

                    اليوم {item.day}

                  </span>


                </div>





                <h2>

                  {item.title}

                </h2>



                <h3>

                  {item.type}

                </h3>



                <p>

                  {item.content}

                </p>



              </div>


            ))


          }


        </div>


      }




    </div>


  );


}