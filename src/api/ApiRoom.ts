import { fetcher } from "./Fetcher";

export enum EPaymentType {
  Momo,
  Vnpay,
  Zalopay,
  Cash,
}

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

export interface ICheckTypeRes {
  type_room: any;
  c: number;
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
  username: string;
  gender: string;
  email: string;
  phone: string;
  check_in: Date;
  check_out: Date;
  type_room_id: number;
  payment_method: EPaymentType;
  quantity: number;
}

export interface ICheckTypeRoom {
  check_in: Date;
  check_out: Date;
  id?: number;
}

const getRooms = (params?: IGetRoomsParams): Promise<IGetRoomsRes> => {
  return fetcher({ method: "get", url: "/room", params });
};

const getRoom = (slug: string): Promise<IRoomRes> => {
  return fetcher({ method: "get", url: `/room/${slug}` });
};

const bookRoom = (data: IBookRoomBody): Promise<string> => {
  return fetcher({ method: "post", url: "booking", data });
};

const checkTypeRoom = (data: ICheckTypeRoom): Promise<ICheckTypeRes[]> => {
  return fetcher({ method: "post", url: "booking/check", data });
};

export default {
  getRooms,
  getRoom,
  bookRoom,
  checkTypeRoom,
};
