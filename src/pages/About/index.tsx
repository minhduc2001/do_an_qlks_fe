import SubHeader from "@/components/SubHeader/SubHeader";
import { Carousel, Col, Row } from "antd";
import "./index.scss";

export default function About() {
  return (
    <div className="about-page">
      <SubHeader
        title="Về Khách sạn Ninh Bình Legend"
        description="Là lựa chọn nghỉ dưỡng hoàn hảo giúp du khách được tận hưởng giá trị sống đích thực"
        image="https://ninhbinhlegendhotel.com/wp-content/uploads/2022/09/CAR_0773-HDR-scaled.jpg"
      ></SubHeader>
      <div className="px-20 py-10 flex justify-center">
        <Row gutter={33} justify={"center"} className="w-[90%]">
          <Col span={12} className="flex flex-col gap-4">
            <div className="elementor-image">
              <img
                width="969"
                height="485"
                src="https://ninhbinhlegendhotel.com/wp-content/uploads/2022/11/MH_00299-969x485.jpg"
                className="attachment-airi-969-485 size-airi-969-485"
                alt=""
                decoding="async"
                loading="lazy"
              />{" "}
            </div>

            <div className="elementor-image">
              <img
                width="969"
                height="485"
                src="https://ninhbinhlegendhotel.com/wp-content/uploads/2022/11/AGR_8520-969x485.jpg"
                className="attachment-airi-969-485 size-airi-969-485"
                alt=""
                decoding="async"
                loading="lazy"
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="title">
              <span>N</span>
              <span>
                inh Binh Legend Hotel - địa điểm dừng chân lý tưởng cho mọi hành
                trình
              </span>
            </div>
            <div className="flex flex-col  div-text">
              <p>
                Khách sạn Ninh Bình Legend được triển khai xây dựng vào năm 2007
                và chính thức đi vào hoạt động trong tháng 3 năm 2010 với 108
                phòng khách cùng cơ sở vật chất và tiện ích cao cấp để đáp ứng
                nhu cầu của khách hàng. Đây là khách sạn đạt tiêu chuẩn 4 sao
                quốc tế đầu tiên tại tỉnh Ninh Bình.
              </p>
              <p>
                Năm 2017, tổ hợp Khách Sạn – Hội Nghị – Sự Kiện – Ẩm thực được
                khởi công xây dựng. Tới năm 2020 chính thức đi vào hoạt động đạt
                tiêu chuẩn 5 sao với tổng 268 phòng khách cao cấp, nhà hàng
                all-day-dining với sức chứa lên tới 450 khách, 6 sảnh sự kiện
                lớn với sức chứa lên tới hơn 1000 khách mỗi sảnh cùng hệ thống
                trang thiết bị âm thanh, ánh sáng, sân khấu, màn hình LED hiện
                đại đáp ứng được mọi loại hình sự kiện. Ngoài ra, khách sạn Ninh
                Binh Legend còn cung cấp các dịch vụ như Hồ bơi, sân Tennis,
                Trung tâm thể hình, Spa và Sky Bar.
              </p>
              <p>
                Hơn 10 năm hình thành và phát triển, Khách sạn Ninh Bình Legend
                được biết tới là địa điểm lưu trú nghỉ dưỡng quen thuộc và yêu
                thích của du khách trong và ngoài nước.
              </p>
              <p>
                Ngày 28/06/2022, chúng tôi tự hào trở thành khách sạn 5 sao đầu
                tiên của Ninh Bình, nơi mang đến cho khách hàng những trải
                nghiệm lưu trú, nghỉ dưỡng chất lượng cao và cơ hội “ Sống trọn
                vẹn từng phút giây”.
              </p>
            </div>
          </Col>
        </Row>
      </div>

      <div className="px-20 py-10 flex justify-center">
        <Row gutter={80} justify={"center"} className="w-[90%] row-2">
          <Col span={12} className="flex flex-col gap-4">
            <span>TẦM NHÌN VÀ SỨ MỆNH</span>
            <ul>
              <li>
                Mang đến các dịch vụ hoàn hảo, thỏa mãn sự trải nghiệm của hàng
                nghìn lượt khách trong &amp; ngoài nước.
              </li>
              <li>Khát vọng tiên phong và phát triển bền vững.&nbsp;</li>
              <li>Đưa dịch vụ khách hàng lên hàng đầu.</li>
              <li>Tạo ra được những giá trị cho xã hội, cộng đồng.</li>
              <li>Cống hiến cho nền kinh tế xã hội ngày một phát triển hơn.</li>
            </ul>
          </Col>
          <Col span={12} className="flex flex-col gap-4">
            <span>GIÁ TRỊ CỐT LÕI</span>
            <ul>
              <li>
                <b>
                  Sản phẩm
                  <br />
                </b>
                Các dòng sản phẩm chất lượng.
                <br />
                Thiết kế ấn tượng và tiên phong.
                <br />
                Trang bị các công nghệ tiên tiến nhất.
                <br />
                Tập trung vào sự tiện nghi.
                <br />
                An toàn, linh hoạt, thuận tiện.
              </li>
              <li>
                <b>
                  Dịch vụ <br />
                </b>
                Thực hiện hành động mang lại chuỗi giá trị cảm xúc cho Khách
                hàng.
              </li>
              <li>
                <b>
                  Nhân sự <br />
                </b>
                Chúng tôi lan tỏa niềm vui.
                <br />
                Chúng tôi hướng tới khách hàng.
                <br />
                Chúng tôi có phong cách.
                <br />
                Chúng tôi nhanh nhẹn.
                <br />
                Chúng tôi truyền cảm hứng.
              </li>
              <li>
                <b>
                  Thương hiệu
                  <br />
                </b>
                Uy tín – Bền vững.
                <br />
                Tạo ra sự trải nghiệm.
              </li>
            </ul>
          </Col>
        </Row>
      </div>

      <div className="px-20 py-10 flex justify-center">
        <Carousel></Carousel>
      </div>
    </div>
  );
}
