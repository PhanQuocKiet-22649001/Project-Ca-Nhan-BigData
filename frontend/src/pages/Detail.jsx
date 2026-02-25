import { useParams, Link } from 'react-router-dom';
import '../styles/detail.css';

function Detail() {
  const { id } = useParams();
  
  return (
    <div className="detail-page">
      <div className="detail-img-placeholder">Ảnh sản phẩm {id}</div>
      <div className="detail-info">
        <h2>Tên Sản Phẩm {id}</h2>
        <p className="price">Giá: Liên hệ</p>
        <p className="desc">Đây là thông tin chi tiết của sản phẩm {id}. Thiết kế tối giản với 2 màu đen trắng chủ đạo, phù hợp cho mọi hoạt động thể thao và dạo phố.</p>
        <button className="btn-black">Thêm vào giỏ</button>
        <br/><br/>
        <Link to="/" className="link-back">Trở về trang chủ</Link>
      </div>
    </div>
  );
}

export default Detail;