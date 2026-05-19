import Navbar from "../components/Navbar"

function Booking() {
  return (
    <div>

      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl font-bold mb-10">
          Book Tickets
        </h1>

        <div className="bg-slate-800 p-8 rounded-3xl max-w-3xl">

          <h2 className="text-3xl font-bold mb-8">
            Ticket Selection
          </h2>

          <div className="flex justify-between items-center bg-slate-700 p-5 rounded-2xl mb-6">

            <div>
              <h3 className="text-2xl font-bold">
                General Pass
              </h3>

              <p className="text-gray-400">
                ₹499
              </p>
            </div>

            <input
              type="number"
              min="1"
              defaultValue="1"
              className="bg-slate-900 p-3 rounded-xl w-24"
            />

          </div>

          <button className="bg-purple-600 px-8 py-4 rounded-2xl hover:bg-purple-700">
            Proceed to Checkout
          </button>

        </div>

      </div>

    </div>
  )
}

export default Booking