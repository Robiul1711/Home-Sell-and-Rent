import Banner from '@/components/home/Banner'
import ContactForm from '@/components/home/ContactForm'
import WhoWeAre from '@/components/home/WhoWeAre'
import { whoweare } from '@/utils/data'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Banner/>
      <WhoWeAre data={whoweare} className={`max-w-[853px] `}/>
      <ContactForm/>
    </div>
  )
}

export default Home