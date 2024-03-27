import ApiService from "@/api/ApiService";
import "./index.scss";
import ButtonGlobal from "@/components/ButtonGlobal";
import { useQuery } from "@tanstack/react-query";
import { Carousel, Col, Image, Popover, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import ApiRoom from "@/api/ApiRoom";
import ApiPromotion from "@/api/ApiPromotion";
import moment from "moment";

export default function Hotel() {
  const navigate = useNavigate();

  const { data: services } = useQuery(["get_services"], () =>
    ApiService.getServices()
  );

  const { data: rooms } = useQuery(["get_rooms"], () =>
    ApiRoom.getRooms({ page: 0, limit: 5 })
  );

  const { data: promotions } = useQuery(["get_promotions"], () =>
    ApiPromotion.getPromotions()
  );

  const openAboutPage = () => {
    navigate("/about");
  };

  const openDetail = (slug: string) => {
    navigate(`/room/${slug}`);
  };

  return (
    <div className="home-page">
      <div className="mt-10"></div>
      <div className="flex justify-center px-20 py-10 bg-[#F3EEE7] div-info-top">
        <div className="flex gap-6 p-4 w-[80%] flex-col">
          <video
            className="elementor-video mb-4"
            src="https://ninhbinhlegendhotel.com/wp-content/uploads/2022/07/Sequence-01_5.mp4"
            autoPlay
            loop={true}
            controls={true}
            muted={true}
            playsInline
            controlsList=""
          ></video>

          <span>YOU COME AS A GUEST, YOU LEAVE AS A FRIEND</span>
          <h1>
            Ninh Binh Legend Hotel - Địa Điểm Dừng Chân Lý Tưởng Cho Mọi Hành
            Trình
          </h1>
          <Link to={"#"}>Tìm hiểu về chúng tôi</Link>
        </div>
      </div>

      {/* <div className="px-20 py-10">
        <div className="text-center mb-3">
          <h3 className="text-[19px] spac">Nổi bật</h3>
          <h1 className="text-[#333] text-[1.8em] font-normal">KHUYẾN MẠI</h1>
        </div>
        <div className="flex justify-center">
          <Row gutter={[16, 24]} className="w-[1200px]">
            {promotions?.results?.map((item, i) => (
              <Col key={i} sm={24} md={12} lg={8}>
                <div className="text-center">
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
                        <li>
                          Ngày bắt đầu:{" "}
                          {moment(item.startDate).format("DD-MM-YYYY")}
                        </li>
                        <li>
                          Ngày kết thúc:{" "}
                          {moment(item.endDate).format("DD-MM-YYYY")}
                        </li>
                        <li>Discount: {item.discount ?? 0}%</li>
                      </ul>
                    }
                  >
                    <h2 className="cursor-pointer text-[16px] hover:text-[#fcb134] mt-2 uppercase">
                      {item.name ?? "Tên khuyến mại chờ cập nhật"}
                    </h2>
                  </Popover>
                  <p className="my-3">
                    {item.description ?? "Mô tả khuyến mại chờ cập nhật"}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div> */}

      <div className="px-20 py-10 bg-[#f5f5f5]">
        <div className="text-center mb-3">
          {/* <h3 className="text-[19px]">Khách sạn Ninh Bình</h3> */}
          <h1 className="text-[#333] text-[1.8em] font-bold">
            DANH SÁCH PHÒNG
          </h1>
        </div>
        <div className="carousel mb-5">
          <Row className="w-[80%]" gutter={22}>
            {rooms?.results?.slice(0, 2)?.map((item, i) => {
              return (
                <Col span={12} key={i}>
                  <Image
                    className="h-[500px] w-full object-cover cursor-pointer"
                    src={
                      item.images?.[0] ??
                      "https://www.pistachiohotel.com/UploadFile/Banner/home2.jpg"
                    }
                    preview={false}
                    onClick={() => openDetail(item.slug)}
                  />
                  <div className="div-info-room">
                    <h2 onClick={() => openDetail(item.slug)}>
                      {item.name ?? "Tên phòng đang chờ cập nhật"}
                    </h2>
                    <p>{item.description ?? "Mô tả phòng đang chờ cập nhật"}</p>
                  </div>
                </Col>
              );
            })}
          </Row>
          <span>
            <Link to={"/room"}>Khám phá nhiều hơn</Link>
          </span>
        </div>
      </div>

      <div className="px-20 py-10 bg-[#f5f5f5]">
        <div className="text-center mb-3">
          {/* <h3 className="text-[19px]">Khách sạn Ninh Bình</h3> */}
          <h1 className="text-[#333] text-[1.8em] font-bold">
            DANH SÁCH KHUYẾN MÃI
          </h1>
        </div>
        <div className="carousel mb-5">
          <Row className="w-[80%]" gutter={22}>
            {promotions?.results?.slice(0, 2)?.map((item, i) => {
              return (
                <Col span={12} key={i}>
                  <Image
                    className="h-[500px] w-full object-cover cursor-pointer"
                    src={
                      item.image ??
                      "https://www.pistachiohotel.com/UploadFile/Banner/home2.jpg"
                    }
                    preview={false}
                  />
                  <div className="div-info-room">
                    <h2>{item.name ?? "Tên phòng đang chờ cập nhật"}</h2>
                    <p>{item.description ?? "Mô tả phòng đang chờ cập nhật"}</p>
                  </div>
                </Col>
              );
            })}
          </Row>
          <span>
            <Link to={"/promotion"}>Khám phá nhiều hơn</Link>
          </span>
        </div>
      </div>

      <div className="px-20 py-10 bg-[#f5f5f5]">
        <div className="text-center mb-3">
          {/* <h3 className="text-[19px]">Khách sạn Ninh Bình</h3> */}
          <h1 className="text-[#333] text-[1.8em] font-bold">
            DANH SÁCH DỊCH VỤ
          </h1>
        </div>
        <div className="carousel mb-5">
          <Row className="w-[80%]" gutter={22}>
            {services?.results?.slice(0, 2)?.map((item, i) => {
              return (
                <Col span={12} key={i}>
                  <Image
                    className="h-[500px] w-full object-cover cursor-pointer"
                    src={
                      item.image ??
                      "https://www.pistachiohotel.com/UploadFile/Banner/home2.jpg"
                    }
                    preview={false}
                  />
                  <div className="div-info-room">
                    <h2>{item.name ?? "Tên phòng đang chờ cập nhật"}</h2>
                    <p>{item.description ?? "Mô tả phòng đang chờ cập nhật"}</p>
                  </div>
                </Col>
              );
            })}
          </Row>
          <span>
            <Link to={"/service"}>Khám phá nhiều hơn</Link>
          </span>
        </div>
      </div>

      {/* <div className="px-20 py-10">
        <div className="text-center mb-3">
          <h3 className="text-[19px] spac">Nổi bật</h3>
          <h1 className="text-[#333] text-[1.8em] font-normal">
            TIỆN NGHI & DỊCH VỤ
          </h1>
        </div>
        <div className="flex justify-center">
          <Row gutter={[16, 24]} className="w-[1200px]">
            {services?.results?.map((item, i) => (
              <Col key={i} md={24} lg={12} className="flex">
                <div className="w-[290px] h-[200px] overflow-hidden bg-[#ccc]">
                  <Image
                    className="w-[290px] h-[200px] object-cover hover:scale-125 transition-all duration-300 ease-out"
                    src={
                      item.image ??
                      "https://www.pistachiohotel.com/UploadFile/Banner/home5.jpg"
                    }
                    preview={false}
                  />
                </div>
                <div className="flex flex-col justify-center flex-1 p-5 text-center ">
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
                    <h3 className="cursor-pointer font-bold hover:text-[#bb834b]">
                      {item.name ?? "Tên dịch vụ chờ cập nhật"}
                    </h3>
                  </Popover>
                  <p className="my-3">
                    {item.description ?? "Mô tả dịch vụ chờ cập nhật"}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div> */}

      {/* <div className="px-20 py-10 bg-[#f5f5f5]">
        <div className="text-center mb-3">
          <h3 className="text-[19px] spac">Bản đồ</h3>
          <h1 className="text-[#333] text-[1.8em] font-normal">
            VỊ TRÍ KHÁCH SẠN
          </h1>
        </div>
        <div>
          <div className="flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.4580290489357!2d103.84083457619391!3d22.336327879660754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x36cd416ca288a78d%3A0x2f373ec5673d75ef!2zNDcgWHXDom4gVmnDqm4sIFRULiBTYSBQYSwgU2EgUGEsIEzDoG8gQ2FpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1699022185410!5m2!1svi!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div> */}
    </div>
  );
}
