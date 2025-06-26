import ProductCard from '../components/ProductCard';

export default function Home() {
  return (
    <div>
      <h2>歡迎來到首頁！</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard id="1" name="貓咪罐頭" price={199} image="https://example.com/cat-food.jpg" />
        <ProductCard id="2" name="狗狗罐頭" price={209} image="https://example.com/cat-food.jpg" />
        <ProductCard id="3" name="企鵝罐頭" price={129} image="https://example.com/cat-food.jpg" />
        <ProductCard id="4" name="豬罐頭" price={315} image="https://example.com/cat-food.jpg" />
        <ProductCard id="5" name="臭鼬罐頭" price={78} image="https://example.com/cat-food.jpg" />
      </div>
    </div>
  );
}
