import ApiRoom, { IGetRoomsParams } from "@/api/ApiRoom";
import SubHeader from "@/components/SubHeader/SubHeader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Col, Row } from "antd";
import { useMemo } from "react";
import ItemRoom from "./components/ItemRoom/ItemRoom";

export default function Room() {
  const roomParams: IGetRoomsParams = {
    page: 0,
    limit: 4,
  };

  const {
    data: rooms,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["get_rooms", roomParams],
    ({ pageParam = 0 }) =>
      ApiRoom.getRooms({
        ...roomParams,
        page: pageParam,
      }),
    {
      getNextPageParam: (lastPage) => {
        const page = lastPage.metadata.pageNumber ?? 0;
        const total = lastPage.metadata.totalItems ?? 0;
        const limit = roomParams.limit ?? 4;
        return total > (page + 1) * limit ? page + 1 : undefined;
      },
      cacheTime: 0,
    }
  );

  const displayRooms = useMemo(() => {
    return (
      (rooms?.pages ?? [])
        .flatMap((subArray) => subArray)
        .flatMap((obj) => obj.results ?? []) ?? []
    );
  }, [rooms?.pages]);

  return (
    <div className="room-page bg-[#FAF7F2]">
      <SubHeader
        title="Phòng Nghỉ"
        description="268 Phòng nghỉ cao cấp với thiết kế theo phong cách đương đại phóng khoáng và thời thượng, được trang bị đầy đủ tiện nghi hiện đại đảm bảo mang đến cho du khách những phút giây nghỉ ngơi, thư giãn tuyệt vời"
      ></SubHeader>
      <div className="px-20 py-10">
        <h1 className="text-center mb-3 text-[#333] text-[1.8em] font-normal">
          DANH SÁCH PHÒNG
        </h1>
        <div className="flex justify-center">
          <Row gutter={[32, 24]} className="w-[1200px]">
            {displayRooms?.map((item, i) => (
              <Col key={i} sm={24} md={8}>
                <ItemRoom item={item}></ItemRoom>
              </Col>
            ))}
          </Row>
        </div>
        {hasNextPage && (
          <div className="flex justify-center mt-5 cursor-pointer text-lg hover:opacity-70">
            <span role="presentation" onClick={() => fetchNextPage()}>
              Tải thêm
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
