import React from "react";



export type Feedback = {
  id: number;
  title: string;
  description: string;
  category: string;
  updates: number;
  comments: number;
};


interface FeedbackListProps {
  feedbacks: Feedback[];
}

const FeedbackList: React.FC<FeedbackListProps> = ({ feedbacks }) => {
  return (
    <div className="flex flex-col gap-4 w-full mx-auto mt-[20px]">
      {feedbacks.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-md p-6 shadow-sm flex items-start justify-between"
        >
        
          <div className="flex flex-col items-center justify-center w-12 h-12 bg-[#F2F4FF] rounded-md text-[#4661E6] font-semibold mr-6 cursor-pointer"> ▲
           <span className="text-sm">{item.updates}</span>
          </div>

          <div className="flex-1">
            <h3 className="text-[#3A4374] font-bold text-base mb-1">
              {item.title}
            </h3>
            <p className="text-[#647196] text-sm mb-3">{item.description}</p>
            <span className="text-[#4661E6] bg-[#F2F4FF] text-xs px-3 py-1 rounded-md">
              {item.category}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#3A4374]">
           <svg
    width="18"
    height="16"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.62074 16H1.34534L2.24718 15.0895C2.73344 14.5986 3.0371 13.9601 3.11873 13.2674C1.03637 11.8878 0 9.88917 0 7.79388C0 3.92832 3.51913 0 9.0305 0C14.8692 0 18 3.61479 18 7.45522C18 11.321 14.8361 14.9333 9.0305 14.9333C8.0135 14.9333 6.95226 14.7963 6.00478 14.5448C5.10787 15.4735 3.89262 16 2.62074 16Z"
      fill="#CDD2EE"
    />
  </svg>
            <span className="font-semibold text-sm">{item.comments}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
