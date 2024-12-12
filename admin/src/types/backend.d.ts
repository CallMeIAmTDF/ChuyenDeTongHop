export {};
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
  type IBackendRes<T> = {
    message: string;
    code: number | string;
    data?: T;
  }

  type IModelPaginate<T> = {
    meta: {
      page: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }

  type IModelPaginateRequest = {
    page: number;
    size: number;
    sort: string[];
  }

  type IModelSpecificationRequest = {
    filter: string;
  }
}