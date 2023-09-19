/* eslint-disable react-hooks/rules-of-hooks */
import { useState, createContext, useEffect } from 'react';
import './App.css';
import Navbar, {RoleTypes} from './components/Navbar';
import Router from './Router';
import Loader from './components/Loader';
import SimpleBottomNavigation from './components/BottomNavigation';
import { CssBaseline, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

export const GeneralContext= createContext()

function App() {
  
  const [mode, setMode]= useState("light");
  const [user, setUser]= useState();
  const [loader, setLoader] = useState(true);
  const [userRolyType, setUserRoleType]= useState(RoleTypes.none);
  
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
    useEffect(() => {
      fetch(`https://api.shipap.co.il/clients/login`, {
      credentials: 'include',
    })
    .then(res => {
      if (res.ok) {
          return res.json();
      } else {
          return res.text().then(x => {
              throw new Error(x);
          });
      }
    })
    .then(data => {
      setUser(data);
      setUserRoleType(RoleTypes.user);
      if (data.business){
        setUserRoleType(RoleTypes.business);
      } else if (data.admin){
        setUserRoleType(RoleTypes.admin);
      }
    })
    .catch(err => {
      setUserRoleType(RoleTypes.none);
    })
    .finally(() => setLoader(false));
    }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      <GeneralContext.Provider value={{ user, loader, setLoader, setUser, userRolyType, setUserRoleType, mode, setMode }}>
        <Navbar />
        <Router />
        <SimpleBottomNavigation />
        {loader && <Loader />}
      </GeneralContext.Provider>
    </ThemeProvider>
  );
}

export default App;
