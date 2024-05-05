import { createContext, useEffect, useState } from 'react'
import auth from '../apis/modules/auth'

const AuthContext = createContext(undefined)

function AuthContextProvider(props) {
  const [user, setUser] = useState();
  const [loggedIn, setloggedIn] = useState({});

  async function getLogged() {
    try {
      const loggedInRes = await auth.currentUser();
      console.log(loggedInRes.data.data[0]);
      setloggedIn(loggedInRes.data.data[0]);
      setUser(loggedInRes.data.data[0])

    } catch (error) {
      setloggedIn(null)
    }
  }

  useEffect(() => {
    getLogged();
    
  }, [])

  return <AuthContext.Provider value={{
    loggedIn,
    user,
    setUser,
  }}>
    {props.children}
  </AuthContext.Provider>
}

export default AuthContext;
export { AuthContextProvider }