import React from 'react';
import Header from '../Components/Shared/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Shared/Footer';

const UserLayout = () => {
    return (
        <div>
            {/* <Header></Header> */}
            <Outlet></Outlet>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default UserLayout;