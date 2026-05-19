import Navbar from "../components/Navbar"

function CreateEvent() {
  return (
    <div>

      <Navbar />

      <div className="max-w-3xl mx-auto py-10 px-6">

        <h1 className="text-5xl font-bold mb-10">
          Create Event
        </h1>

        <div className="space-y-6">

          <input
            type="text"
            placeholder="Event Name"
            className="w-full p-4 rounded-xl bg-slate-800 outline-none"
          />

          <input
            type="text"
            placeholder="Category"
            className="w-full p-4 rounded-xl bg-slate-800 outline-none"
          />

          <input
            type="text"
            placeholder="Venue"
            className="w-full p-4 rounded-xl bg-slate-800 outline-none"
          />

          <input
            type="date"
            className="w-full p-4 rounded-xl bg-slate-800 outline-none"
          />

          <textarea
            placeholder="Event Description"
            rows="6"
            className="w-full p-4 rounded-xl bg-slate-800 outline-none"
          ></textarea>

          <button className="bg-purple-600 px-8 py-4 rounded-2xl hover:bg-purple-700">
            Create Event
          </button>

        </div>

      </div>

    </div>
  )
}

export default CreateEvent