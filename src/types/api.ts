// export type ApiReturn<T> = {
//   success: boolean;
//   message: string;
//   data: T;
//   code?: number;
// };

// export type ApiError = {
//   message: string;
//   code: number;
//   success: boolean;
// };

// export type UninterceptedApiError = {
//   message: string | Record<string, string[]>;
// };

type PaginateData<Data> = {
  data_perPage: Data;
  meta: {
    page: number;
    maxPage: number;
  };
};

export interface PaginatedApiResponse<DataType> {
  code: number;
  success: string;
  data: PaginateData<DataType>;
}
