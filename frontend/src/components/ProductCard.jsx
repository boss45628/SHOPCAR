function ProductCard({ name, price, image }) {
  return (
    <div className="flex flex-col justify-between border rounded-lg shadow p-4 bg-white hover:shadow-xl transform hover:scale-[1.02] transition duration-300">
      <img src={image} alt={name} className="w-full h-40 object-cover mb-2 rounded" />

      <div className="flex-1">
        <h3 className="text-lg font-bold mb-1 text-gray-800">{name}</h3>
        <p className="text-gray-600 mb-4">${price}</p>
      </div>

      <button
        onClick={() => alert(`加入購物車：${name}`)}
        className="bg-green-500 text-white py-2 rounded hover:bg-green-600 active:scale-95 transition"
      >
        加入購物車
      </button>
    </div>
  );
}

export default ProductCard;
