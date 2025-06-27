import { useCart } from '../contexts/CartContext';

function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  return (
    <div className="max-w-4xl mx-auto mt-20 p-4">
      <h1 className="text-3xl font-bold mb-6">購物車清單</h1>

      {cartItems.length === 0 && <p>購物車是空的喔！</p>}

      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li key={item.id} className="flex items-center justify-between border p-4 rounded">
            <div className="flex items-center space-x-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p>${item.price}</p>
                <p>數量：{item.quantity}</p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:underline"
            >
              移除
            </button>
          </li>
        ))}
      </ul>

      {cartItems.length > 0 && (
        <button
          onClick={clearCart}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          清空購物車
        </button>
      )}
    </div>
  );
}

export default Cart;
