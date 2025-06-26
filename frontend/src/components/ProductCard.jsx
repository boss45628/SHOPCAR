import { useCart } from '../contexts/CartContext';

function ProductCard({ id, name, price, image }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({ id, name, price, image });
    alert(`${name} 已加入購物車`);
  };

  return (
    <div className="border rounded shadow p-4 bg-white hover:shadow-lg transition">
      <img src={image} alt={name} className="w-full h-40 object-cover mb-2 rounded" />
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-gray-600">${price}</p>
      <button
        onClick={handleAdd}
        className="mt-2 w-full bg-green-500 text-white py-1 rounded hover:bg-green-600"
      >
        加入購物車
      </button>
    </div>
  );
}
export default ProductCard;
