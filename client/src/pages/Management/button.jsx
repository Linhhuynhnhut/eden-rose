import React from "react";
import { Button as AntButton } from 'antd';
import { Link } from "react-router-dom";
function CustomButton({ name, link }) {
    const buttonStyle = {
        color: '#FFFFFF',
        backgroundColor: '#5E7249',
        width: '120px',
        height: '40px',
        fontSize: '18px',
        borderColor: '#5E7249'

    };
  
 
    return (
        <div className="button">
            <Link to={link}> <AntButton style={buttonStyle} className="custom-button" ghost >{name}</AntButton ></Link>
            <style>
                {`
                    .custom-button:hover {
                        transform: scale(1.1); 
                        transition: transform 0.3s ease;
                        background-color: #FFFFFF;
                        outline: none;
                        border-color: '#5E7249'
                     
                    }
                `}
            </style>
        </div>
    )
}
export default CustomButton;
