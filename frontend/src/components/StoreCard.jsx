export default function StoreCard({ store }) {
  console.log(store);
  return (
    <div className=" w-full bg-white rounded-2xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition">
      {/* Store Info */}
      <div className="mb-3">
        <h2 className="text-xl font-semibold text-gray-800">
          {store.storeName}
        </h2>
        <p className="text-gray-500 text-sm">{store.storeAddress}</p>
      </div>

      {/* products*/}
      {/* <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">
          Featured Items
        </h3> */}
      {/* Products */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">
          Products ({store.productCount})
        </h3>

        {/* <ul className="space-y-1 text-gray-700 text-sm">
          {store.featuredItems.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>{item.name}</span>
              <span>Rs {item.price}</span>
            </li>
          ))}
        </ul> */}

        {store.products.length > 0 ? (
          <ul className="space-y-1 text-gray-700 text-sm">
            {store.products.slice(0, 3).map((item) => (
              <li key={item._id} className="flex justify-between">
                <span>{item.name}</span>
                <span>Rs {item.price}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400">No products yet</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-between ">
        <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 transition">
          Details
        </button>
        <button className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-hover transition">
          Contact
        </button>
      </div>
    </div>
  );
}
