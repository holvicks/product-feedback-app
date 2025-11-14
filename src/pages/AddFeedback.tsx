import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { usePostFeedback } from "../hooks/usePostFeedback";

const CreateFeedback = () => {
  const navigate = useNavigate();
  const { submitFeedback, submitting, error, isSuccess } = usePostFeedback();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
    const payload = {
      ...formData,
      category: formData.category.toUpperCase(),
    };

    console.log("Payload being sent:", payload);

    submitFeedback(payload, {
      onSuccess: () => {
        setTimeout(() => navigate("/"), 1000);
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F8FD] flex flex-col items-center py-10 px-4">
      <div
        onClick={() => navigate(-1)}
        className="w-full max-w-xl flex items-center gap-2 text-[#647196] mb-8 cursor-pointer hover:text-[#4661E6] transition"
      >
        <span className="text-sm font-medium">← Go Back</span>
      </div>

      <div className="bg-white w-full max-w-xl rounded-xl shadow-md p-8 relative">
        <div className="absolute -top-6 left-8 bg-gradient-to-br from-[#AD1FEA] to-[#4661E6] w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
          <FaPlus className="text-white" />
        </div>

        <h2 className="text-2xl font-bold text-[#3A4374] mt-6 mb-6">
          Create New Feedback
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
        )}

        {isSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Feedback submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Feedback Title */}
          <div>
            <label className="block text-[#3A4374] font-semibold mb-1">
              Feedback Title
            </label>
            <p className="text-[#647196] text-sm mb-2">
              Add a short, descriptive headline
            </p>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Add dark mode support"
              className="w-full border border-[#CDD2EE] rounded-md p-3 text-[#3A4374] focus:outline-none focus:border-[#4661E6]"
              required
            />
          </div>

     
          <div>
            <label className="block text-[#3A4374] font-semibold mb-1">
              Category
            </label>
            <p className="text-[#647196] text-sm mb-2">
              Choose a category for your feedback
            </p>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-[#CDD2EE] rounded-md p-3 text-[#3A4374] focus:outline-none focus:border-[#4661E6]"
            >
              <option value="FEATURE">Feature</option>
              <option value="UI">UI</option>
              <option value="UX">UX</option>
              <option value="ENHANCEMENT">Enhancement</option>
              <option value="BUG">Bug</option>
            </select>
          </div>

          {/* Feedback Detail */}
          <div>
            <label className="block text-[#3A4374] font-semibold mb-1">
              Feedback Detail
            </label>
            <p className="text-[#647196] text-sm mb-2">
              Include any specific comments on what should be improved, added, etc.
            </p>
            <textarea
  name="content"
  value={formData.content}
  onChange={handleChange}
  rows={4}
  placeholder="Describe your feedback..."
  className="w-full border border-[#CDD2EE] rounded-md p-3 text-[#3A4374] focus:outline-none focus:border-[#4661E6]"
  required
></textarea>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-[#3A4374] text-white px-4 py-2 rounded-md font-semibold hover:opacity-90"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-br from-[#AD1FEA] to-[#4661E6] text-white px-4 py-2 rounded-md font-semibold hover:opacity-90 disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Add Feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFeedback;
