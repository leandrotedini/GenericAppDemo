const USER_LOCAL_VARIABLE_NAME = 'loggedBlogListappUser'

export let userToken = ''

export const setUserLocalStorage = (user) => {
  window.localStorage.setItem(
    USER_LOCAL_VARIABLE_NAME, JSON.stringify(user)
  )
  userToken = `bearer ${user.token}`
}

export const getUserLocalStorage = () => {
  let user = null
  const loggedUserJSON = window.localStorage.getItem(USER_LOCAL_VARIABLE_NAME)
  if (loggedUserJSON) {
    user = JSON.parse(loggedUserJSON)
    userToken = `bearer ${user.token}`
  }
  return user
}

export const removeUserLocalStorage = () => {
  window.localStorage.removeItem(USER_LOCAL_VARIABLE_NAME)
  userToken = ''
}