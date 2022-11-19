require('dotenv').config()
import loginService  from '../services/login'
import blogService  from '../services/blogs'

const loginUser = async () => {
  try {
    const user = await loginService.login({
      username: process.env.validUsername,
      password: process.env.validPassword
    })

    blogService.setToken(user.token)
  } catch (e) { console.log(e) }

}

export default loginUser