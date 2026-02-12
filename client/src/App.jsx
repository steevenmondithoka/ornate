import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Proshows from "./pages/Proshows";
import Registration from "./pages/RegistrationForm";
import Schedule from "./pages/Schedule";
import Alumni from "./pages/Alumni";
import Gallery from "./pages/Gallery";
import Sponsors from "./pages/Sponsors";
import Stalls from "./pages/Stalls";
import Contact from "./pages/Contact";
import DepartmentDetail from "./pages/DepartmentDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import StallRegister from "./pages/StallRegister";
import { TShirtRegistration } from "./pages/TShirtRegistration";
import AlumniRegistrationPage from "./pages/AlumniRegistrationPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import AdminManagement from "./components/AdminManagement";
import CosmicDance from "./pages/CosmicDance";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const SuperAdminRoute = ({ children }) => {
  const adminData = JSON.parse(localStorage.getItem("adminInfo"));
  if (!adminData || adminData.role !== "superadmin") {
    return <Navigate replace to="/admin-dashboard" />;
  }
  return children;
};

function AnimatedApp() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 900); // loader duration

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />

      {/* LOADER */}
      <AnimatePresence mode="wait">
        {loading && <PageLoader key="loader" />}
      </AnimatePresence>

      <div className="bg-[#050712] text-slate-100 selection:bg-[#7C87F7] selection:text-white antialiased">
        <Navbar />

        <main className="min-h-screen">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/admin-gate" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/event/:eventId" element={<EventDetailsPage />} />
            <Route path="/department/:id" element={<DepartmentDetail />} />
            <Route path="/proshows" element={<Proshows />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/stall-registration" element={<StallRegister />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/alumni" element={<Alumni />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/cosmic-dance" element={<CosmicDance />} />
            <Route path="/stalls" element={<Stalls />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tshirt-registration" element={<TShirtRegistration />} />
            <Route path="/alumni-registration" element={<AlumniRegistrationPage />} />
            <Route
              path="/manage-admins"
              element={
                <SuperAdminRoute>
                  <AdminManagement />
                </SuperAdminRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <Router>
      <AnimatedApp />
    </Router>
  );
}
