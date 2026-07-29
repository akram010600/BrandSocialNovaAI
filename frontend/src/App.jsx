import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import Sidebar from "./components/Sidebar.jsx";


// Pages

import Dashboard from "./pages/Dashboard.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Analytics from "./pages/Analytics.jsx";
import ImageGenerator from "./pages/ImageGenerator.jsx";
import PromptGenerator from "./pages/PromptGenerator.jsx";
import PromptLibrary from "./pages/PromptLibrary.jsx";
import Integrations from "./pages/Integrations.jsx";
import Campaigns from "./pages/Campaigns.jsx";
import Calendar from "./pages/Calendar.jsx";
import ContentPlanner from "./pages/ContentPlanner.jsx";




export default function App() {


  const { i18n } = useTranslation();



  useEffect(() => {

    document.documentElement.dir =
      i18n.language === "ar" ? "rtl" : "ltr";

    document.documentElement.lang =
      i18n.language;

  }, [i18n.language]);





  const changeLanguage = () => {

    const newLanguage =
      i18n.language === "ar" ? "en" : "ar";

    i18n.changeLanguage(newLanguage);

  };




  return (


    <div className="app-layout">


      <Sidebar />



      <main className="main-content">


        <button
          onClick={changeLanguage}
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1000,
            padding: "8px 14px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            background: "#111827",
            color: "#ffffff",
            fontSize: "14px"
          }}
        >
          {i18n.language === "ar" ? "English" : "العربية"}
        </button>




        <Routes>


          <Route
            path="/"
            element={<Dashboard />}
          />


          <Route
            path="/create"
            element={<CreatePost />}
          />


          <Route
            path="/image-generator"
            element={<ImageGenerator />}
          />


          <Route
            path="/prompt-generator"
            element={<PromptGenerator />}
          />


          <Route
            path="/prompts"
            element={<PromptLibrary />}
          />


          <Route
            path="/campaigns"
            element={<Campaigns />}
          />


          <Route
            path="/calendar"
            element={<Calendar />}
          />


          <Route
            path="/planner"
            element={<ContentPlanner />}
          />


          <Route
            path="/analytics"
            element={<Analytics />}
          />


          <Route
            path="/integrations"
            element={<Integrations />}
          />


          <Route
            path="*"
            element={<Dashboard />}
          />


        </Routes>



      </main>



    </div>


  );

}