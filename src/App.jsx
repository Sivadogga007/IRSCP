import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";

import './App.css'

import Navbar from "./components/Navbar";
import ErrorPage from "./components/Error";
import AboutPage from "./components/AboutPage";
import HomePage from "./components/HomePage";
import AutheForm from "./components/Authentication";
import Gallery from "./components/Gallery";
import AllAnnouncements from "./components/AnnouncementsPage";
import NewsPage from "./components/NewsPage";


export default function App() {
  return (
    <>
    <Navbar/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Announcements" element={<AllAnnouncements />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/News" element={<NewsPage />} />
        <Route path="/Discussion Forum" element={<AutheForm />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <Footer/>
    </>
  )
}
