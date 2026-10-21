import { api } from "../../api/api";
import md5 from "md5";

export const SET_USER = "SET_USER";
export const SET_ROLES = "SET_ROLES";
export const SET_THEME = "SET_THEME";
export const SET_LANGUAGE = "SET_LANGUAGE";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles,
});

// Helper: Gravatar URL oluşturucu
const getAvatarUrl = (email) => {
  if (!email) return "";
  const emailClean = email.trim().toLowerCase();
  const hash = md5(emailClean);
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
};

// Thunk: Login
export const loginUserThunk = (credentials, rememberMe) => async (dispatch) => {
  const response = await api.post("/login", credentials);
  const data = response.data;

  const userData = {
    ...data,
    avatar: getAvatarUrl(credentials.email),
  };

  dispatch(setUser(userData));

  // Bearer öneki olmadan eklenir
  api.defaults.headers.common["Authorization"] = data.token;

  if (rememberMe) {
    localStorage.setItem("token", data.token);
  }

  return userData;
};

// Thunk: T11 Auto Login & Verify Token
export const verifyTokenThunk = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return;
  }

  // Tokenı Bearer öneki olmadan headera ekle
  api.defaults.headers.common["Authorization"] = token;

  try {
    const response = await api.get("/verify");
    const data = response.data;

    const userData = {
      ...data,
      avatar: getAvatarUrl(data.email),
    };

    // User objesini storea koy
    dispatch(setUser(userData));

    // Yeni gelen token varsa yenile
    const newToken = data.token || token;
    localStorage.setItem("token", newToken);
    api.defaults.headers.common["Authorization"] = newToken;

    return userData;
  } catch (error) {
    // Token geçersizse temizle
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    dispatch(setUser(null));
  }
};
