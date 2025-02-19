"use client";

import logo from '../../assets/images/Logo.png';

const Navbar = () => {




  return (
    <div className="bg-card h-13 border-b-2 border-slate-900 p-3">
      <div className='flex content-center gap-60 justify-between'>
        <div className="flex justify-start items-center">
          <img src={logo.src} alt="Food_share-Logo" className='h-[40px] ' />
          <h1 className='ml-8 text-3xl'>FoodsShare</h1>
        </div>

      </div>
    </div>
  );
};

export default Navbar;