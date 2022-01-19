import coockie from "js-cookie";

//set in coockie
export const setCoockie = (key: string, value: string) => {
  if (window !== undefined) {
    coockie.set(key, value, {
      expires: 30,
    });
  }
};
//remove from coockie
export const removeCoockie = (key: string) => {
  if (window !== undefined) {
    coockie.remove(key);
  }
};
//get from coockie
export const getCoockie = (key: string) => {
  if (window !== undefined) {
    console.log(coockie.get());
    return coockie.get(key);
  }
};
//set in localstorage
export const setLocalStorage = (key: string, value: string) => {
  if (window !== undefined) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
//remove from localstorage
export const removeLocalStorage = (key: string) => {
  if (window !== undefined) {
    localStorage.removeItem(key);
  }
};
//authenticate user (authenticae and redirect user)
export const authenticate = (data: any, next: any) => {
  setCoockie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

//access user info from localstorage
export const isAuth = () => {
  if (window !== undefined) {
    return !!getCoockie("token");
    //  if (coockieChecked) {
    //    if (localStorage.getItem("user")) {
    //      return JSON.parse(localStorage.getItem("user")!);
    //    } else {
    //      return false;
    //    }
    //  }
  }
};
