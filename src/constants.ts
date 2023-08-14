export const SERVER_PORT = 4000;
export const POSTGRES_PORT = 5432;
export const POSTGRES_HOSTNAME = 'localhost'; // run in docker - 'postgres', if not 'localhost'
export const POSTGRES_USERNAME = 'postgres';
export const POSTGRES_PASSWORD = 'root';
export const DB_NAME = 'Node-js-server';

export enum ROUTES {
  USER = '/user',
  TRACK = '/track',
  ARTIST = '/artist',
  ALBUM = '/album',
  FAVS = '/favs',
}

export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const HTML_START_PAGE = `
<div style="width: 100%; height: 100%; display: flex;
    background: radial-gradient(circle, rgba(255,196,222,1) 0%, rgba(255,255,255,0.3477766106442577) 63%);
    text-align: center;
    font-weight: 600;
    font-family: monospace;
    justify-content: center;
    align-items: center;">
    This is REST server for rs school, go to
    <a href="http://localhost:4000/doc" style="color: #e43636; padding: 0 10px;"> /doc </a> for more info.
</div>
`;
