import ShoeCard from '../components/Shoecard';
import '../styles/home.css';

const mockShoes = [
  { id: 1, name: 'Classic Black Sneaker', price: '1,500,000' },
  { id: 2, name: 'White Runner Pro', price: '2,200,000' },
  { id: 3, name: 'Urban Streetwear', price: '1,800,000' },
];

function Home() {
  return (
    <div className="home-page">
      <h1>Danh Sách Sản Phẩm</h1>
      <div className="shoe-grid">
        {mockShoes.map(shoe => (
          <ShoeCard key={shoe.id} shoe={shoe} />
        ))}
      </div>
    </div>
  );
}

export default Home;