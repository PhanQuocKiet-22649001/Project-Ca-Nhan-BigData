import { Link } from 'react-router-dom';

function ShoeCard({ shoe }) {
  return (
    <div className="shoe-card">
      <div className="img-placeholder">Ảnh sản phẩm {shoe.id}</div>
      <h3>{shoe.name}</h3>
      <p>{shoe.price} VNĐ</p>
      <Link to={`/detail/${shoe.id}`} className="btn-black">Xem Chi Tiết</Link>
    </div>
  );
}

export default ShoeCard;