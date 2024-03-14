import { Col, Divider, Row } from "antd";
import "./index.scss";

function Footer() {
  return (
    <footer className="footer">
      <Row className="w-[90%]" justify={"center"} gutter={10}>
        <Col className="" span={4}>
          <span>Giới thiệu</span>
          <ul>
            <li>
              <a href="">Về chúng tôi</a>
            </li>
            <li>
              <a href="">Liên hệ</a>
            </li>
          </ul>
        </Col>
        <Col span={6}>
          <span>Liên hệ</span>
          <ul>
            <li>
              <span>Tel: </span>
              +842293 899 880/70/60/50
            </li>
            <li>
              <span>Hotline: </span>
              +84905 958 228/ +84941780990
            </li>
            <li>
              <span>Email: </span>
              info@ninhbinhlegendhotel.com
            </li>
            <li>
              <span>Address: </span>
              177, Lê Thái Tổ, Khu đô thị Xuân Thành, Thành Phố Ninh Bình, Việt
              Nam
            </li>
          </ul>
        </Col>
        <Col span={6}>
          <span>Điều khoản và quy định</span>
          <ul>
            <li>
              <a href="">Điểu khoản chung</a>
            </li>
            <li>
              <a href="">Quy định chung</a>
            </li>
            <li>
              <a href="">Quy định thanh toán</a>
            </li>
            <li>
              <a href="">Quy định xác nhận thông tin đặt phòng</a>
            </li>
          </ul>
        </Col>
        <Col span={4}>
          <span>Follow us</span>
        </Col>
      </Row>
      <Divider />
      <p>
        © NINH BINH LEGEND HOTEL COPYRIGHT | ALL RIGHT RESERVED | THUY ANH NINH
        BINH LEGEND HOTELS COMPANY LIMITED
      </p>
    </footer>
  );
}

export default Footer;
