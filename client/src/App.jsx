import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Home from './Pages/HomePage/Home';
import LoggedHome from './Pages/HomePage/LoggedHome';
import NotFound from "./Pages/NotFound/NotFound";

const berryTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#673ab7",
      light: "#ede7f6",
      dark: "#4527a0",
    },
    secondary: {
      main: "#2196f3",
      light: "#e3f2fd",
      dark: "#1565c0",
    },
    success: {
      main: "#00c853",
      light: "#e8f5e9",
    },
    warning: {
      main: "#ffab00",
      light: "#fff8e1",
    },
    error: {
      main: "#f44336",
      light: "#ffebee",
    },
    background: {
      default: "#eef2f6",
      paper: "#ffffff",
    },
    text: {
      primary: "#121926",
      secondary: "#697586",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Segoe UI', Arial, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 14px 0 rgba(32, 40, 45, 0.08)",
          border: "1px solid #e3e8ef",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});

function AppLayout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className={isDashboard ? "App app-dashboard" : "App app-public"}>
      {!isDashboard && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/*" element={<LoggedHome />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isDashboard && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={berryTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
