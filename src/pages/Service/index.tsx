import ApiService from "@/api/ApiService";
import SubHeader from "@/components/SubHeader/SubHeader";
import { useQuery } from "@tanstack/react-query";
import { Col, Image, Popover, Row } from "antd";

export default function Service() {
  const { data: services } = useQuery(["get_services"], () =>
    ApiService.getServices()
  );

  return (
    <div className="room-page">
      <SubHeader
        title="Dịch vụ"
        image="https://ninhbinhlegendhotel.com/wp-content/uploads/2022/09/CAR_6689-scaled.jpg"
      ></SubHeader>
      <div className="px-20 py-10 bg-[#F3eee7]">
        <div className="flex justify-center">
          <Row gutter={[16, 24]} className="w-[1200px]">
            {services?.results.map((item, i) => (
              <Col key={i} sm={24} md={8}>
                <div className="text-start">
                  <div className="w-full h-[400px] overflow-hidden bg-[#ccc]">
                    <Image
                      className="w-full h-[400px] object-cover transition-all duration-300 ease-out cursor-pointer"
                      src={
                        item.image ??
                        "https://www.pistachiohotel.com/UploadFile/Banner/home5.jpg"
                      }
                      preview={false}
                    />
                  </div>

                  <div className=" div-info">
                    <span className="flex justify-between items-center">
                      <h2
                        className="cursor-pointer text-[16px] hover:text-[#fcb134]  uppercase"
                        role="presentation"
                      >
                        {item.name || "Tên dịch vụ chờ cập nhật"}
                      </h2>
                      <h2
                        className="cursor-pointer text-[16px] hover:text-[#fcb134] "
                        role="presentation"
                      >
                        {(item.price || 0).toLocaleString()} đ / {item.unity}
                      </h2>
                    </span>
                    <p className="my-3">
                      {item.description || "Mô tả dịch chờ cập nhật"}
                    </p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
