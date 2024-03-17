import SubHeader from "@/components/SubHeader/SubHeader";
import "./index.scss";
import { Col, Row } from "antd";

const Contact = () => {
  return (
    <>
      <SubHeader
        title="Liên hệ"
        image="https://ninhbinhlegendhotel.com/wp-content/uploads/2022/09/CAR_6888-1-scaled.jpg"
      />
      <div>
        <div className=" bg-[#FAF7F2]">
          <div className="contact">
            <span>Liên hệ chúng tôi</span>
            <Row gutter={30} className="w-full" justify={"center"}>
              <Col span={7}>
                <span>Địa điểm</span>
                <p>
                  177, Lê Thái Tổ, KĐT Xuân Thành, Thành Phố Ninh Bình, Việt Nam
                </p>
              </Col>
              <Col span={5}>
                <Row gutter={[0, 50]} className="gap-4">
                  <Col span={24}>
                    <span>Tel</span>
                    <p>+842293 899 880/70/60/50</p>
                  </Col>
                  <Col span={24}>
                    <span>Hotline</span>
                    <p>+84905 958 228/ +84941780990</p>
                  </Col>
                </Row>
              </Col>
              <Col span={4}>
                <span>Download</span>
                <p>E – brochure</p>
                <p>Factsheet</p>
              </Col>
              <Col span={4}>
                <span>Email</span>
                <p>info@ninhbinhlegendhotel.com</p>
              </Col>
            </Row>
          </div>
          <div className="flex justify-center py-20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.4580290489357!2d103.84083457619391!3d22.336327879660754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x36cd416ca288a78d%3A0x2f373ec5673d75ef!2zNDcgWHXDom4gVmnDqm4sIFRULiBTYSBQYSwgU2EgUGEsIEzDoG8gQ2FpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1699022185410!5m2!1svi!2s"
              width="100%"
              height="600"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
