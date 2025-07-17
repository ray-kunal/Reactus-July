import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {
    return (
        <nav className=" p-4 text-white w-[100%] text-center bg-[#EF798A]">
            <div className="container mx-auto flex justify-between items-center ">
                <div>
                    <GiHamburgerMenu size={30}/>
                </div>
                <h1 className="flex-1 text-[1.6rem] font-retro font-bold text-center">Tic Tac Toe</h1>
            </div>
        </nav>
    );
};

export default Navbar;