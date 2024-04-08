import _superagent from "superagent";
const SuperagentPromise = require("superagent-promise");
const superagent = SuperagentPromise(_superagent, global.Promise);

const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT; // local & dev

const encode = encodeURIComponent;
const responseBody = (res: any) => res.body;

let token: any = null;
const tokenPlugin = (req: any) => {
  if (token) {
    req.set("authorization", `Bearer ${token}`);
  }
};
const requests = {
  del: (url: string) =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: (url: string) =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url: string, body: any) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  patch: (url: string, body: any) =>
    superagent
      .patch(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url: string, body: any) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  file: (url: string, key: string, file: any) =>
    superagent
      .post(`${API_ROOT}${url}`)
      .attach(key, file)
      .use(tokenPlugin)
      .then(responseBody),
};

const Auth = {
  signin: (body: any) => requests.post(`signin`, body),
};
const Advertisements = {
  create: (body: any) => requests.post(`advertisements`, body),
  pagination: () => requests.get(`advertisements`),
  _id: (_id: string) => requests.get(`advertisements/${_id}`),
  update: (body: any, id: string) =>
    requests.patch(`devices/${id}`, body),
  accept: (id: string, body: any) =>
    requests.patch(`devices/${id}/approve`, body),
  reject: (id: string, body: any) =>
    requests.patch(`advertisements/${id}/decline`, body),
};
const Users = {
  pagination: () => requests.get(`users`),
};

const Contents = {
  getBySlug: (slug: string) => requests.get(`content/${slug}`),
  pagination: () => requests.get(`content`),
  delete: (id: string) => requests.del(`content/${id}`),
  update: (id: string, data: any) => requests.patch(`content/${id}`, data),
  create: (data: any) => requests.post(`content`, data),
};

const ContactUs = {
  pagination: () => requests.get(`contact-us`),
  update: (id: string, data: any) => requests.patch(`contact-us/${id}`, data),
  approve: (id: string, data: any) =>
    requests.patch(`contact-us/${id}/approve`, data),
  delete: (id: string) => requests.del(`contact-us/${id}`),
  create: (data: any) => requests.post(`contact-us`, data),
};

export default {
  API_ROOT,
  ContactUs,
  Auth,
  Contents,
  Advertisements,
  Users,
  encode,
  setToken: (_token?: string) => {
    token = _token;
  },
};
