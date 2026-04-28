import { HashRouter, Route, Routes } from "react-router";
import AdminRoutes from "./pages/admin";
import Index from "./pages/public";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />}></Route>
        <Route path="/" element={<Index />} />
      </Routes>
    </HashRouter>
  )
}
