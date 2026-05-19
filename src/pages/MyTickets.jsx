import Navbar from "../components/Navbar"

function MyTickets() {
  return (
    <div>

      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl font-bold mb-10">
          My Tickets
        </h1>

        <div className="space-y-8">

          <div className="bg-slate-800 rounded-3xl p-8 flex flex-col lg:flex-row justify-between gap-10">

            {/* Ticket Info */}
            <div>

              <h2 className="text-3xl font-bold">
                Tech Conference 2026
              </h2>

              <p className="text-gray-400 mt-3 text-lg">
                Chennai • May 25 • VIP Pass
              </p>

              <p className="mt-6 text-gray-300">
                Ticket ID: EVT-2026-4587
              </p>

              <button className="mt-8 bg-purple-600 px-6 py-3 rounded-2xl hover:bg-purple-700">
                Download Ticket
              </button>

            </div>

            {/* QR Placeholder */}
            <div className="bg-white p-6 rounded-2xl flex items-center justify-center">

              <div className="w-48 h-48 bg-black"></div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default MyTickets