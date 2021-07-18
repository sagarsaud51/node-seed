export interface ICrudInterface {

  list: (limit: number, page: number) => Promise<any>;
  create: (resource: any) => Promise<any>;
  putById: (id: string, resource: any) => Promise<any>;
  readById: (id: string) => Promise<any>;
  deleteById: (id: string) => Promise<any>;

}