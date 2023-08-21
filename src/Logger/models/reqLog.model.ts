export interface ILog {
  type: string;
  message?: string;
  url?: string;
  query?: string;
  body?: string;
  statusCode?: number;
}
