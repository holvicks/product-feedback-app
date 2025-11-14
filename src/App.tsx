import React, { useState, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import feedBackImage from "./assets/feedback.png";
import NewFeedback from "./pages/NewFeedBack";
import FeedbackList from "./components/FeedBackList";
import "./App.css";


// --- FEEDBACK DASHBOARD PAGE ---
function FeedbackDashboard() {
  const navigate = useNavigate();

  const [sortType, setSortType] = useState("most-updates");

  const [feedbacks] = useState([
    {
      id: 1,
      title: "Add tags for solutions",
      description: "Easier to search for solutions based on a specific stack.",
      category: "Enhancement",
      updates: 112,
      comments: 2,
    },
    {
      id: 2,
      title: "Add a dark theme option",
      description:
        "It would help people with light sensitivities and who prefer dark mode.",
      category: "Feature",
      updates: 99,
      comments: 4,
    },
    {
      id: 3,
      title: "Q&A within the challenge hubs",
      description: "Challenge-specific Q&A would make for easy reference.",
      category: "Feature",
      updates: 65,
      comments: 1,
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFeedbacks =
    selectedCategory === "All"
      ? feedbacks
      : feedbacks.filter((f) => f.category === selectedCategory);

  const noFeedback = filteredFeedbacks.length === 0;

  // const sortedFeedbacks = filteredFeedbacks;

// SORTING LOGIC i guess
 const sortedFeedbacks = useMemo(() => {
    const list = [...filteredFeedbacks];

    switch (sortType) {
      case "most-updates":
        return list.sort((a, b) => b.updates - a.updates);

      case "least-updates":
        return list.sort((a, b) => a.updates - b.updates);

      case "most-comments":
        return list.sort((a, b) => b.comments - a.comments);

      case "least-comments":
        return list.sort((a, b) => a.comments - b.comments);

      default:
        return list;
    }
  }, [sortType, filteredFeedbacks]);

  const handleAddFeedback = () => navigate("/new-feedback");

  return (
    <div className="flex w-full gap-6 md:flex md:flex-col">

      {/* SIDEBAR (Always visible on desktop, moves above on mobile) */}
      <div className="hidden md:block">
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <Navbar onSortChange={setSortType} />

        <div
          className={`bg-white rounded-xl p-6 transition-all duration-300 flex ${
            noFeedback
              ? "items-center justify-center"
              : "items-start justify-start pt-6"
          }`}
        >
          {noFeedback ? (
            <div className="text-center max-w-md px-4">
              <img
                src={feedBackImage}
                alt="No Feedback"
                className="mx-auto mb-8 w-40 h-40 object-contain"
              />
              <h2 className="text-2xl font-bold text-[#3A4374] mb-4">
                There is no feedback yet.
              </h2>
              <p className="text-sm text-[#647196] mb-6">
                Got a suggestion? Found a bug that needs to be squashed? We love
                hearing about new ideas to improve our app.
              </p>
              <button
                onClick={handleAddFeedback}
                className="bg-[#AD1FEA] hover:bg-[#C75AF6] transition text-white font-semibold py-3 px-6 rounded-lg text-sm"
              >
                + Add Feedback
              </button>
            </div>
          ) : (
            <div className="w-full">
              <FeedbackList feedbacks={sortedFeedbacks} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// --- MAIN APP WRAPPER ---
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F7F8FD] p-6 gap-6">
        <Routes>
          <Route path="/" element={<FeedbackDashboard />} />
          <Route path="/new-feedback" element={<NewFeedback />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
