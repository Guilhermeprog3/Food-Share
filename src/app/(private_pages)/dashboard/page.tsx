"use client"

import Navbar_Private from '@/components/Navbar_Private'
import dynamic from 'next/dynamic'
const OpenStreetMap = dynamic(() => import('../../../components/maps/index'), {
  ssr: false,
})
const Dashboard_page = () => {
  return (
    <>
    <div>
      <div className="mb-10">
        <Navbar_Private/>
      </div>
      <div className='justify-center flex '>
       <OpenStreetMap /> 
      </div>
      
    </div>
      
    </>
  )
}
export default Dashboard_page