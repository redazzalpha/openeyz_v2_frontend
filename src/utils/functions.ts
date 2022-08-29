import router from '../router';
import store from "@/store";
import { UserMap, VueResponse, Post, Users } from './types';
import { DateTime } from "luxon";
import { SERVER_PUBLICATION_LIMIT_URL, SERVER_USER_NOTIF_URL, SERVER_USER_SIMPLE_URL, SERVER_COMMENT_LIMIT_URL, ACCESS_PAGE_URL } from './defines';
import { httpRequest } from '@/utils/http';

export async function getSimpleUsers(): Promise<void> {
  const res = await httpRequest.get(SERVER_USER_SIMPLE_URL);
  const userListObj = (res.body as UserMap).map((e: string[]) => {
    const [name, avatarSrc, role, username] = e;
    return {
      name: name,
      avatarSrc: avatarSrc,
      role: role,
      username: username,
    };
  });
  store.dispatch("updateUserListObj", userListObj);
  store.dispatch("updateUserCardList", userListObj);
}
export async function getAllPosts(limit: number, creation?: string, authorId?: string): Promise<void | VueResponse> {
  const response: VueResponse | void = await httpRequest.get(
    SERVER_PUBLICATION_LIMIT_URL,
    { params: { limit, creation, authorId } }
  );
  store.dispatch("updatePosts", JSON.parse(response.bodyText));
}
export async function getAllComments(postId: number, limit: number, creation?: string): Promise<void | VueResponse> {
  const response: VueResponse = await httpRequest.get(
    SERVER_COMMENT_LIMIT_URL,
    { params: { postId, limit, creation } }
  );
  store.dispatch("updateComments", response.body as []);

}
export async function getAllNotifs(): Promise<void | VueResponse> {
  const response: VueResponse = await httpRequest.get(
    SERVER_USER_NOTIF_URL
  );
  store.dispatch("updateUserNotifs", response.body);
}


export async function addAllPosts(limit: number, creation?: string, authorId?: string): Promise<void | VueResponse> {
  const response: VueResponse | void = await httpRequest.get(
    SERVER_PUBLICATION_LIMIT_URL,
    { params: { limit, creation, authorId } }
  );
  (response.body as []).forEach((e: Post) => { store.dispatch('addPosts', e); });
}
export async function addAllComments(postId: number, limit: number, creation?: string): Promise<void | VueResponse> {

  const response: VueResponse | void = await httpRequest.get(
    SERVER_COMMENT_LIMIT_URL,
    { params: { postId, limit, creation } }
  );
  (response.body as []).forEach((e: Post) => { store.dispatch('addComments', e); });
}


export function clearVuex() {
  store.dispatch("clearVuex");
}
export function clearStorage() {
  store.dispatch("clearVuex"),
    localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("vuex");
}

export function translateDate(timestamp: string): string {
  return DateTime.fromISO(timestamp).setLocale("en").toFormat("DD 'at' HH:mm");
}
export function translateDateToISO(timestamp: string): string {
  return DateTime.fromISO(timestamp).setLocale("fr").toISO();
}



export function unavailableServerHandler(response: VueResponse): void {
  response.bodyText = "server is unavailable";
  pushAccessUrl();
}
export function internalServerErrorHandler(response: VueResponse): void {
  response.bodyText = "internal server error";
  pushAccessUrl();
}
export function defaulHandler({ body, headers }: VueResponse): void {
  const token: string | null = headers.get("x-auth-token");
  const refreshToken : string | null = headers.get("x-refresh-token");
  const user: Users = body as Users;
  
  if (token && refreshToken && user) {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    store.dispatch('updateCurrentUser', user);
  }
}

export function pushAccessUrl(): void {
  clearStorage();
  if (router.currentRoute.path !== "/access")
    router.push(ACCESS_PAGE_URL);
}
