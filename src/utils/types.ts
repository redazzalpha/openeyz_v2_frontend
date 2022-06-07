// vue types
export interface VueFunction  {
   validate() : boolean
  }
export type VueElement = undefined | Vue | Element | (Vue | Element)[];
export interface PPP  extends  VueFunction {
  name: string,
}
export interface VueResponse {
  body: object | Blob | string | Body | object[];
  bodyText: string;
  url: string;
  headers: Headers;
  ok: boolean;
  status: number;
  statusText: string;

  text: () => Promise<string>;
  json: () => Promise<JSON>;
  blob: () => Promise<Blob>;
}
export interface VueRequest {
  url: string;
  body: Body;
  headers: Headers;
  method: string;
  params: object;
  timeout: number;
  credentials: boolean;
  emulateHTTP: boolean;
  emulateJSON: boolean;
  before: (Request: Request) => (void);
  progress: (Request: Event) => (void);

  getUrl: () => (string);
  getBody: () => (Body);
  respondWith: (body: Body, config: object) => (Response);
  abort: () => (void);

}

// http types
export interface Body {
  token: string;
  user: object;
}

// model types
export enum RoleEnum { USER, ADMIN, SUPERADMIN }
export interface Role { roleName: RoleEnum | string; }
export type UserMap = [[]];
export class UserObj {
  name = "";
  avatarSrc = "";
  role = "";
  username = "";
}
export interface Item {
  post: Post;
  creation: string;
  commentCount: number;
  likeCount: number;
  userLike: boolean;
}

export class Users{
  username = String;
  lname = String;
  name = String;
  password = String;
  state = Boolean;
  description = String;
  avatarSrc = String;
  roles = Array<Role>();
}
export interface Post {
  id: number;
  content: string;
  creation: string;
  author: Users;
}
export interface Comment {
  id: number;
  content: string;
  creation: string;
  author: Users;
  post: Post;
}
export interface Notif {
  id: number,
  owner: Users,
  comment: Comment, 
}
export interface Likes {
  id: number,
  post: Post,
  author: Users,
}

