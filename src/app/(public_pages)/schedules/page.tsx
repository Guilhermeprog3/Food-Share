"use client"

import { SchedulestList } from "@/components/SchedulesList";
import Navbar_Private from '@/components/Navbar_Private'
const Schedules_page = () => {
  return (
    <>
    <div>
      <div className="mb-10">
        <Navbar_Private/>
      </div>
      
      <div className="h-full justify-center flex items-center">
        <SchedulestList/>
      </div>
      
    </div>
      
    </>
  )
}
export default Schedules_page