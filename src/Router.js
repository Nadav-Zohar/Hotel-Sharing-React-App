import { Route, Routes } from 'react-router-dom';
import Login from './user/Login';
import Signup from './user/Signup';
import Account from './user/Account';
import AllCards from './cards/AllCards';
import FavCards from './cards/FavCards';
import MyCards from './cards/MyCards';
import About from './pages/About';
import UsersMenagement from './admin/UsersManagement';
import AddCard from './cards/AddCard';
import CardPage from './cards/CardPage';
import EditCard from './cards/EditCard';

export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<AllCards />}></Route>
            <Route path='/favorite' element={<FavCards />}></Route>
            <Route path='/my-cards' element={<MyCards />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/account' element={<Account />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/admin' element={<UsersMenagement />}></Route>
            <Route path='/add-card' element={<AddCard />}></Route>
            <Route path='/card-page/:cardID' element={<CardPage />}></Route>
            <Route path='/edit-card/:cardID' element={<EditCard />}></Route>
        </Routes>
        )
}
