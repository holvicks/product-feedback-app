import { useNavigate } from "react-router-dom";

export default function NewFeedback() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F7F8FD] p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-sm p-8 relative">
        {/* Floating Plus Icon */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center text-white text-3xl font-bold">
          +
        </div>

        {/* Go Back */}
        <button
          onClick={() => navigate("/")}
          className="text-[#4661E6] font-semibold mb-6 hover:underline flex items-center gap-1"
        >
          ← Go Back
        </button>

        {/* Form */}
        <h1 className="text-[#3A4374] text-2xl font-bold mb-8">Create New Feedback</h1>

        <form className="space-y-6">
          <div>
            <label className="block text-[#3A4374] font-semibold mb-1">
              Feedback Title
            </label>
            <p className="text-sm text-[#647196] mb-2">
              Add a short, descriptive headline
            </p>
            <input
              type="text"
              className="w-full bg-[#F7F8FD] rounded-md p-3 outline-none focus:ring-2 focus:ring-[#AD1FEA]"
            />
          </div>

          <div>
            <label className="block text-[#3A4374] font-semibold mb-1">
              Category
            </label>
            <p className="text-sm text-[#647196] mb-2">
              Choose a category for your feedback
            </p>
            <select
              className="w-full bg-[#F7F8FD] rounded-md p-3 outline-none focus:ring-2 focus:ring-[#AD1FEA]"
            >
              <option>Feature</option>
              <option>UI</option>
              <option>UX</option>
              <option>Enhancement</option>
              <option>Bug</option>
            </select>
          </div>

          <div>
            <label className="block text-[#3A4374] font-semibold mb-1">
              Feedback Detail
            </label>
            <p className="text-sm text-[#647196] mb-2">
              Include any specific comments on what should be improved, added, etc.
            </p>
            <textarea
              rows={4}
              className="w-full bg-[#F7F8FD] rounded-md p-3 outline-none focus:ring-2 focus:ring-[#AD1FEA]"
            ></textarea>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-[#3A4374] hover:bg-[#656EA3] transition text-white font-semibold py-2 px-4 rounded-lg text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#AD1FEA] hover:bg-[#C75AF6] transition text-white font-semibold py-2 px-4 rounded-lg text-sm"
            >
              Add Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
