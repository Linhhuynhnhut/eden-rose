import React, { useState, useEffect } from "react";
import { Button, Flex, Radio } from 'antd';
import { Link, useLocation } from "react-router-dom";

import './management.scss';
import img_WeddingHall from '../../assets/img_WeddingHall_Heading.png';
import img_Service from '../../assets/img_Service_Heading.png';
import img_Dish from '../../assets/img_Dish_Heading.png';
import img_Wedding from '../../assets/img_Wedding_Heading.png';
import img_Header from '../../assets/img_header.png';
import img_Header_while from '../../assets/img_Header_while.png';
import img_Management_Text from '../../assets/img_Management_Text.png';
import img_manamentpage_hall from '../../assets/img_manamentpage_hall.png';
import img_management_Dish from '../../assets/img_management_Dish.png';
import img_management_Service from '../../assets/img_management_Service.png';
import CustomButton from './button';
import styled from "styled-components";

const AnimatedFlex = styled(Flex)`
  opacity: ${({ active }) => (active ? 1 : 0)};
  transform: translateY(${({ active }) => (active ? "0" : "20px")});
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

const Management = () => {
  const [activeFlexIndex, setActiveFlexIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const flexElements = document.querySelectorAll(".management_flex");
      let foundIndex = null;
      flexElements.forEach((flex, index) => {
        const rect = flex.getBoundingClientRect();
        if (rect.top <= window.innerHeight-350 && rect.bottom >= 100) {
          foundIndex = index;
        }
      });
      if (foundIndex !== null) {
        setActiveFlexIndex(foundIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  
  return <div className="management_page">
    <div className="management_page_header">
      <h1>List Management</h1>
      <img src={img_Header} />
    </div>

    <Flex gap="middle">
      <div className="management_page_item">
        <Link to='/management/weddings'><img src={img_Wedding} alt="Wedding Hall" className="management_image" /></Link>
        <p>Wedding</p>
      </div>
      <div className="management_page_item">
        <Link to='/management/halls'><img src={img_WeddingHall} alt="Wedding Hall" className="management_image" /></Link>
        <p>Wedding Hall</p>
      </div>
      <div className="management_page_item">
        <Link to='/management/menu'><img src={img_Dish} alt="Wedding Hall" className="management_image" /></Link>
        <p>Menu</p>

      </div>
      <div className="management_page_item">
        <Link to='/management/services'><img src={img_Service} alt="Wedding Hall" className="management_image" /></Link>
        <p>Service</p>
      </div>
    </Flex>



    <Flex gap="middle" style={{ backgroundColor: '#BDC6B5', marginLeft: '-4%' }}>
      <div className="management_text_img">
        <img src={img_Management_Text} />
      </div>
      <div className="management_page_text">
        <h2>Eden Rose</h2>
        <p>Offering luxurious wedding halls, diverse services, and delicious cuisine to make your special day unforgettable.
          Our venues blend elegance with modern amenities, ensuring comfort and style. Our catering service delights with varied menus,
          and our dedicated team ensures every detail is meticulously planned for a seamless celebration.</p>
      </div>

    </Flex>
    
  
    <AnimatedFlex className="management_flex" index={0} active={activeFlexIndex === 0}>
      <Flex gap="middle" style={{ marginTop: '5%'}}>
        <div className="management_hall_img">
          <img src={img_Wedding} />
        </div>
        <div className="management_hall_text">
          <div className="management_hall_top">
            <h2>Wedding</h2>
            <img src={img_Header} />

          </div>

          <p>Where love stories come to life. Our exquisite venue sets the stage for unforgettable celebrations,
            blending elegance with personalized touches. From intimate gatherings to grand affairs,
            let us turn your dream wedding into a magical reality. </p>
          <CustomButton className="btn_SeeDetail" name="See Detail" link="/management/weddings" />
        </div>

      </Flex>
    </AnimatedFlex>
    <AnimatedFlex className="management_flex" index={1} active={activeFlexIndex === 1}>
    <Flex gap="middle" style={{ backgroundColor: '#BDC6B5', marginLeft: '-4%', marginTop: '5%'}}>
      <div className="management_server_text">
        <div className="management_server_top" >
          <h2 >Wedding Hall</h2>
          <img src={img_Header_while} />

        </div>

        <p>Welcome to our exquisite wedding hall, where elegance meets charm.
          With its timeless decor and spacious layout, it sets the stage for unforgettable celebrations.
          From intimate gatherings to grand affairs, our hall is ready to host your dream wedding</p>
        <CustomButton className="btn_SeeDetail" name="See Detail" link="/management/halls" />
      </div>
      <div className="management_server_img">
        <img src={img_manamentpage_hall} />
      </div>

    </Flex>
    </AnimatedFlex>
    <AnimatedFlex className="management_flex" index={2} active={activeFlexIndex === 2}>
    <Flex gap="middle" style={{ marginTop: '5%' }}>
      <div className="management_hall_img">
        <img src={img_management_Dish} />
      </div>
      <div className="management_hall_text">
        <div className="management_hall_top">
          <h2>Dish</h2>
          <img src={img_Header} />

        </div>

        <p>Savor the moment with our exquisite cuisine, where every dish is a masterpiece of flavor and presentation.
          From appetizers to desserts, our menu is crafted to delight and impress, ensuring your wedding feast is nothing short of extraordinary.</p>
        <CustomButton className="btn_SeeDetail" name="See Detail" link="/management/menu" />
      </div>

    </Flex>
    </AnimatedFlex>
    
    <AnimatedFlex className="management_flex" index={3} active={activeFlexIndex === 3}>
    <Flex gap="middle" style={{ backgroundColor: '#BDC6B5', marginLeft: '-4%', marginTop: '5%'}}>
      <div className="management_server_text">
        <div className="management_server_top" >
          <h2 >Service</h2>
          <img src={img_Header_while} />

        </div>

        <p>Discover unmatched service tailored to perfection. Our dedicated team is here to ensure every aspect of your wedding day is seamless and unforgettable.
          Let us exceed your expectations and bring your dream wedding to life. </p>
        <CustomButton className="btn_SeeDetail" name="See Detail" link="/management/services" />
      </div>
      <div className="management_server_img">
        <img src={img_management_Service} />
      </div>

    </Flex>
    </AnimatedFlex>


  </div>;
};

export default Management;
