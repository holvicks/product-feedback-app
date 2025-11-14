import React from "react";
import { Link } from "react-router-dom";
import { useFeedbacks } from "../hooks/useFetchFeedback";
import { IoIosArrowUp } from "react-icons/io";

interface FeedbackListProps {
  activeFilter: string;
  sortOption: string;
}

const FeedbackList: React.FC<FeedbackListProps> = ({ activeFilter, sortOption }) => {
  
  const { feedbacks, loading, error } = useFeedbacks();

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  const sortedFeedbacks = [...feedbacks].sort((a, b) => {
    switch (sortOption) {
      case "Most Upvotes":
        return (b.upvotes || 0) - (a.upvotes || 0);

      case "Least Upvotes":
        return (a.upvotes || 0) - (b.upvotes || 0);

      case "Most Comments":
        return (b.replies?.length || 0) - (a.replies?.length || 0);

      case "Least Comments":
        return (a.replies?.length || 0) - (b.replies?.length || 0);

      default:
        return 0;
    }
  });

  const filteredComments = sortedFeedbacks.filter((comment) =>
    activeFilter === "All"
      ? true
      : comment.category.toLowerCase() === activeFilter.toLowerCase()
  );

  if (filteredComments.length === 0) {
    return (
      <div className="bg-white rounded-xl flex flex-col items-center justify-center flex-1 text-center py-20">
        <img src="src/assets/feeedback.png" alt="Empty" className="w-32 mb-8" />
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          No feedbacks under “{activeFilter}” category.
        </h2>
        <p className="text-gray-500 max-w-xs mb-6">
          Got a suggestion? Found a bug? We love hearing about improvements.
        </p>
        <Link to="/addfeedback">
          <button className="bg-[#AD1FEA] hover:bg-[#C75AF6] text-white px-4 py-2 rounded-lg font-semibold text-sm">
            + Add Feedback
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {filteredComments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white p-6 rounded-xl flex justify-between items-start shadow-sm mb-4">

          <div className="flex gap-5">
           <div className="flex md:flex-col flex-row items-center bg-[#F2F4FE] rounded-lg px-3 py-2 gap-1 h-full">
              <span className="text-[#4661E6] font-bold"><IoIosArrowUp /></span>
              <span className="font-bold text-[#4661E6]">{comment.upvotes}</span>
            </div>


            <div>
              <h3 className="font-bold text-gray-800">{comment.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{comment.content}</p>
              <span className="inline-block bg-[#F2F4FF] text-[#4661E6] text-xs font-semibold mt-3 px-3 py-1 rounded-lg">
                {comment.category}
              </span>
            </div>
          </div>

          {/* Number of replies */}
          <div className="flex items-center gap-2">
            <img src="src/assets/comment.svg" alt="Comments" className="w-4 h-4" />
            <span className="font-semibold text-gray-700">
              {comment.replies?.length || 0}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeedbackList;
