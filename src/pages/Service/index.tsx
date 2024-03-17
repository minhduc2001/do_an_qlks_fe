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
      <div className="px-20 py-10">
        <div className="flex justify-center">
          <Row gutter={[16, 24]} className="w-[1200px]">
            {services?.results.map((item, i) => (
              <Col key={i} sm={24} md={12}>
                <div className="text-start">
                  <div className="w-full h-[400px] overflow-hidden bg-[#ccc]">
                    <Image
                      className="hover:scale-125 w-full h-[400px] object-cover transition-all duration-300 ease-out cursor-pointer"
                      src={
                        item.image ??
                        "https://www.pistachiohotel.com/UploadFile/Banner/home5.jpg"
                      }
                      preview={false}
                    />
                  </div>
                  <Popover
                    title={
                      <ul>
                        <li>Đơn vị: {item.unity ?? "-"}</li>
                        <li>
                          Đơn giá: {(item.price ?? 0).toLocaleString()} vnđ
                        </li>
                      </ul>
                    }
                  >
                    <div className="flex justify-between">
                      <h2
                        className="cursor-pointer text-[16px] hover:text-[#fcb134] mt-2 uppercase"
                        role="presentation"
                      >
                        {item.name || "Tên dịch vụ chờ cập nhật"}
                      </h2>
                      <h2
                        className="cursor-pointer text-[16px] hover:text-[#fcb134] mt-2 uppercase"
                        role="presentation"
                      >
                        {(item.price || 0).toLocaleString()} vnđ
                      </h2>
                    </div>
                  </Popover>
                  <p className="my-3">
                    {item.description || "Mô tả dịch chờ cập nhật"}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
