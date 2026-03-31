import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";

// Set axios defaults
axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(<App />);
