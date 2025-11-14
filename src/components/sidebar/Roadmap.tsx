type RoadmapProps = {
  plannedCount?: number;
  inProgressCount?: number;
  liveCount?: number;
};

const Roadmap = ({ plannedCount = 0, inProgressCount = 0, liveCount = 0 }: RoadmapProps) => {
  return (
    <div className="bg-white rounded-xl p-6 ">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800">Roadmap</h3>
        <a href="roadmap" className="text-blue-500 hover:underline focus:underline text-sm">
          View
        </a>
      </div>
      <ul className="space-y-3">
        <li className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-orange-400 mr-3"></span>
          <span className="flex-1 text-gray-700">Planned</span>
          <span className="font-bold text-gray-800">{plannedCount}</span>
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-purple-500 mr-3"></span>
          <span className="flex-1 text-gray-700">In-Progress</span>
          <span className="font-bold text-gray-800">{inProgressCount}</span>
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-blue-300 mr-3"></span>
          <span className="flex-1 text-gray-700">Live</span>
          <span className="font-bold text-gray-800">{liveCount}</span>
        </li>
      </ul>
    </div>
  );
};

export default Roadmap;
