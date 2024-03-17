import ApiPromotion from "@/api/ApiPromotion";
import { useQuery } from "@tanstack/react-query";
import { Col, Image, Popover, Row } from "antd";
import moment from "moment";
import "./index.scss";
import ButtonGlobal from "@/components/ButtonGlobal";
import SubHeader from "@/components/SubHeader/SubHeader";

export default function Promotion() {
  const { data: promotions } = useQuery(["get_promotions"], () =>
    ApiPromotion.getPromotions()
  );

  return (
    <div className="room-page">
      <SubHeader
        title="Quà tặng và Ưu đãi"
        image="https://ninhbinhlegendhotel.com/wp-content/uploads/2022/12/z3943602784039_2a2469c98f56f9c19bebf7e3ef4a8636.jpg"
      ></SubHeader>
      <div className="px-20 py-10 bg-[#F3EEE7]">
        <div className="flex justify-center">
          <Row gutter={[0, 50]} className="w-[1300px]">
            {promotions?.results.map((item, i) => {
              return i % 2 == 0 ? (
                <Col span={24} key={i}>
                  <Row gutter={10}>
                    <Col
                      span={12}
                      md={12}
                      className="flex flex-col items-center gap-4 col-info"
                    >
                      <Image
                        className=""
                        src={
                          item.image ??
                          "https://www.pistachiohotel.com/UploadFile/Banner/home2.jpg"
                        }
                        preview={false}
                      />

                      <h1>{item.name}</h1>
                      <p>{item.description}</p>

                      <div>
                        <ButtonGlobal>Chi tiết ưu đãi</ButtonGlobal>
                      </div>
                    </Col>
                    <Col span={12}></Col>
                  </Row>
                </Col>
              ) : (
                <Col span={24} key={i}>
                  <Row gutter={10}>
                    <Col span={12}></Col>
                    <Col
                      span={12}
                      className="flex flex-col items-center gap-4 col-info"
                    >
                      <Image
                        className=""
                        src={
                          item.image ??
                          "https://www.pistachiohotel.com/UploadFile/Banner/home2.jpg"
                        }
                        preview={false}
                      />

                      <h1>{item.name}</h1>
                      <p>{item.description}</p>

                      <div>
                        <ButtonGlobal>Chi tiết ưu đãi</ButtonGlobal>
                      </div>
                    </Col>
                  </Row>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
}
