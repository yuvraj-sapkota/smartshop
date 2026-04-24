const StatCard = ({ item }) => {
  const Icon = item.icon;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 border border-gray-100 hover:shadow-md transition relative">
      {/* Icon */}
      <div
        className={`absolute top-3 right-3 sm:top-4 sm:right-4 ${item.bg} p-2 rounded-lg`}
      >
        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.text}`} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 pr-10">
        <p className="text-gray-500  truncate">
          {item.label}
        </p>
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">
          {item.value}
        </h2>
      </div>
    </div>
  );
};

export default StatCard;
