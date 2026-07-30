import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Login from "./pages/Auth/Login.jsx";

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



  return (

    <Routes>


      {/* Login */}

      <Route
        path="/login"
        element={<Login />}
      />



      {/* Protected App */}

      <Route

        path="*"

        element={

          <ProtectedRoute>


            <div className="app-layout">


              <Sidebar />


              <main className="main-content">


                <Header title="BrandSocialNova AI" />


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


                </Routes>


              </main>


            </div>


          </ProtectedRoute>

        }

      />


    </Routes>

  );

}