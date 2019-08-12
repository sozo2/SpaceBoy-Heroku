export const isBrowser = () => typeof window !== "undefined"
// LOGIN
export const getUser = () =>
  isBrowser() && window.localStorage.getItem("spaceBoyUser")
    ? JSON.parse(window.localStorage.getItem("spaceBoyUser"))
    : {}

const setUser = user => {
    window.localStorage.setItem("spaceBoyUser", JSON.stringify(user));
}

export const handleLogin = ({ username, password, first_name, is_admin }) => {
    return setUser({
        username: username,
        password: password,
        first_name: first_name,
        is_admin: is_admin
    })
}

export const isLoggedIn = () => {
  const user = getUser()
  return !!user.username
}

export const logout = () => {
  setUser({});
}