import { Route, Routes } from 'react-router-dom';
import Login from './user/Login';
import Signup from './user/Signup';
import Account from './user/Account';

export default function Router() {
    return (
        <Routes>
            {/* {<Route path='/' element={<Cards />}></Route>} */}
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/account' element={<Account />}></Route>
        </Routes>
        )
}