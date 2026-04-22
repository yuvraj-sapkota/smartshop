export default function StoreCard() {
  return (
    <div className=" w-full bg-white rounded-2xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition">
      {/* Store Info */}
      <div className="mb-3">
        <h2 className="text-xl font-semibold text-gray-800">ABC Store</h2>
        <p className="text-gray-500 text-sm">Kathmandu</p>
      </div>

      {/* Featured Items */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">
          Featured Items
        </h3>

        <ul className="space-y-1 text-gray-700 text-sm">
          <li className="flex justify-between">
            <span>Pen</span>
            <span>Rs 10</span>
          </li>
          <li className="flex justify-between">
            <span>iPhone 13</span>
            <span>Rs 100000</span>
          </li>
          <li className="flex justify-between">
            <span>Notebook</span>
            <span>Rs 50</span>
          </li>
        </ul>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 transition">
          View Details
        </button>
        <button className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
          Contact
        </button>
      </div>
    </div>
  );
}
