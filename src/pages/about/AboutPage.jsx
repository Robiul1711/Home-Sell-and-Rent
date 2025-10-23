import AboutBanner from "@/components/about/AboutBanner";
import KoanoDetails from "@/components/about/KoanoDetails";
import OurClient from "@/components/about/OurClient";
import ContactForm from "@/components/home/ContactForm";
import MapComponent from "@/components/map/MapComponent";
import React from "react";

const AboutPage = () => {
  return (
    <div>
      <AboutBanner />
      <KoanoDetails />
      <OurClient />
      {/* <MapComponent/> */}
      <ContactForm/>
    </div>
  );
};

export default AboutPage;
