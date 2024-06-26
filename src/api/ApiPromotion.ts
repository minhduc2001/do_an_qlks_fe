import { Moment } from "moment";
import { fetcher } from "./Fetcher";

export interface IGetPromotionsParams {
  page?: number;
  limit?: number;
  sort?: string[];
  search?: string;
}

export interface IPromotionRes {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  startDate: string;
  endDate: string;
  discount: number;
}

export interface IGetPromotionsRes {
  metadata: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
  results: IPromotionRes[];
}

const getPromotions = (
  params?: IGetPromotionsParams
): Promise<IGetPromotionsRes> => {
  return fetcher({ method: "get", url: "/promotion/find", params });
};

const getPromotion = (checkin?: Date): Promise<IPromotionRes> => {
  return fetcher({ method: "get", url: "/promotion/check/" + checkin });
};

export default {
  getPromotions,
  getPromotion,
};
