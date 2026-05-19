import Navbar from "../components/Navbar"

function Notifications() {
  return (
    <div>

      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl font-bold mb-10">
          Notifications
        </h1>

        <div className="space-y-6">

          {/* Notification Card */}
          <div className="bg-slate-800 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold">
              🎟 Ticket Confirmed
            </h2>

            <p className="text-gray-400 mt-3">
              Your booking for Tech Conference 2026 has been confirmed.
            </p>

            <p className="text-sm text-gray-500 mt-4">
              2 hours ago
            </p>

          </div>

          <div className="bg-slate-800 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold">
              🔔 Event Reminder
            </h2>

            <p className="text-gray-400 mt-3">
              Startup Meetup begins tomorrow at 10:00 AM.
            </p>

            <p className="text-sm text-gray-500 mt-4">
              5 hours ago
            </p>

          </div>

          <div className="bg-slate-800 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold">
              🚀 New Event Added
            </h2>

            <p className="text-gray-400 mt-3">
              AI Innovation Summit 2026 is now open for registration.
            </p>

            <p className="text-sm text-gray-500 mt-4">
              1 day ago
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Notifications