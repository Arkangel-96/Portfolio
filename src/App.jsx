


import Navbar from "./components/Navbar";
import Hero  from "./components/Hero";
import Projects from "./components/Projects";
import Tech from "./components/Tech";
import Github from "./components/Github";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import Profile from "./components/Profile";

import { useEffect, useState } from "react";




function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);

  const [currentView, setCurrentView] = useState("home");
  const [pendingSection, setPendingSection] = useState(null); 
  
  const API_URL = import.meta.env.VITE_API_URL;


  // Verificar sesión
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    fetch(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.email) {
          setUser(data);
        }
      })
      .catch(console.error);
  }, []);

  // Navegación desde Profile hacia una sección

useEffect(() => {
  if (currentView !== "home" || !pendingSection) return;

  const timer = setTimeout(() => {
    const section = document.getElementById(pendingSection);

    if (section) {
      const offset = 55;

      const position =
        section.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({
        top: position,
        behavior: "smooth",
});
    }

    setPendingSection(null);
  }, 50);

  return () => clearTimeout(timer);
}, [currentView, pendingSection]);
    return (
    <>
      <Navbar
        user={user}
        setUser={setUser}
        setShowAuth={setShowAuth}
        setAuthMode={setAuthMode}
        setCurrentView={setCurrentView}
        setPendingSection={setPendingSection}
      />

      {showAuth && (
        <Auth
          mode={authMode}
          onClose={() => setShowAuth(false)}
          setUser={setUser}
        />
      )}

      {currentView === "profile" ? (
      <Profile user={user} />
    ) : (
      <>
        <Hero />
        <Projects />
        <Tech />
        <Github />
        <Contact />
      </>
    )}

      <Footer />
    </>
  );
}

export default App;


