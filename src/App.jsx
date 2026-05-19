import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

import Home from "./pages/Home"
import Events from "./pages/Events"
import Login from "./pages/Login"
import EventDetails from "./pages/EventDetails"
import CreateEvent from "./pages/CreateEvent"
import Dashboard from "./pages/Dashboard"
import Booking from "./pages/Booking"
import MyTickets from "./pages/MyTickets"
import Wishlist from "./pages/Wishlist"
import Notifications from "./pages/Notifications"
import AIFeatures from "./pages/AIFeatures"

function App() {

  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className={
      darkMode
        ? "bg-slate-900 text-white min-h-screen"
        : "bg-white text-black min-h-screen"
    }>

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/events"
            element={<Events darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/login"
            element={<Login darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/event-details"
            element={<EventDetails darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/create-event"
            element={<CreateEvent darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/booking"
            element={<Booking darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/my-tickets"
            element={<MyTickets darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/notifications"
            element={<Notifications darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/ai-features"
            element={<AIFeatures darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

        </Routes>

      </BrowserRouter>

    </div>
  )
}

export default App