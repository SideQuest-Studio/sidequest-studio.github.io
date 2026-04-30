import { HashRouter, Route, Routes } from "react-router"
import Public from "@/pages/public"

export default function App() {
  return (

    <HashRouter>
      <Routes>
        <Route path="/" element={<Public />} />
        <Route path="*" element={<Public />} />
      </Routes>
    </HashRouter>
  )
}
