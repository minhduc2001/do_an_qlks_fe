import { fetcher } from "./Fetcher";

export interface IGetRoomsParams {
  page?: number;
  limit?: number;
  sort?: string[];
  search?: string;
}

export interface IRoomRes {
  area?: number;
  checkin?: string;
  checkout?: string;
  contains?: string;
  description?: string;
  feature_rooms?: { id?: number; name?: string }[];
  id?: number;
  images?: string[];
  name?: string;
  parent?: number;
  price?: number;
  type_bed?: string;
  slug: string;
}

export interface IGetRoomsRes {
  metadata: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
  results: IRoomRes[];
}

export interface IBookRoomBody {
  firstName: string;
  lastName: string;
  sex: string;
  email: string;
  tel: string;
  checkin: string;
  checkout: string;
  idRoom: string;
  paymentType: string;
  quantity: number;
}

export interface ICheckTypeRoom {
  checkin: Date;
  checkout: Date;
  id: number;
}

const getRooms = (params?: IGetRoomsParams): Promise<IGetRoomsRes> => {
  return fetcher({ method: "get", url: "/room", params });
};

const getRoom = (slug: string): Promise<IRoomRes> => {
  return fetcher({ method: "get", url: `/room/${slug}` });
};

const bookRoom = (data: IBookRoomBody): Promise<string> => {
  return fetcher({ method: "post", url: "booking/client-booking", data });
};

const checkTypeRoom = (params: ICheckTypeRoom) => {
  return fetcher({ method: "get", url: "room/check", params });
};

export default {
  getRooms,
  getRoom,
  bookRoom,
  checkTypeRoom,
};
