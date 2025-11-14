import AddFeedback from "./AddFeedback";

const EmptyPage = () => {
  return (
    <div className=" flex flex-col  gap-6 justify-center items-center bg-white w-full h-4/12 ">
      <div>image</div>
      <h3 className="text-3xl font-bold text-[#3A4374]">
        There is no feedback yet
      </h3>
      <p className="w-110 text-center text-[#3A4374]/80">
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.{" "}
      </p>

      <AddFeedback />
    </div>
  );
};

export default EmptyPage;
