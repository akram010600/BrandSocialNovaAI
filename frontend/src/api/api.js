const BASE_URL = "http://127.0.0.1:8000/api";


async function request(path, options = {}) {

  const res = await fetch(`${BASE_URL}${path}`, {

    ...options,

    headers: {

      "Content-Type": "application/json",

      ...(options.headers || {}),

    },

  });


  const data = await res.json();


  if (!res.ok) {

    throw new Error(
      data.detail || "حدث خطأ في الاتصال"
    );

  }


  return data;

}



export const api = {


  login: (payload) =>
    request("/login", {

      method: "POST",

      body: JSON.stringify(payload),

    }),



  register: (payload) =>
    request("/register", {

      method: "POST",

      body: JSON.stringify(payload),

    }),



  getPosts: () =>
    request("/posts"),



  createPost: (payload) =>
    request("/posts", {

      method: "POST",

      body: JSON.stringify(payload),

    }),


};