import React from 'react';
import styled from 'styled-components';

const Pinterest = () => {
    return (
        <StyledWrapper>
            <button className="Btn">
                <span className="svgContainer">
                    <svg viewBox="0 0 384 512" fill="white" height="1.6em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z" />
                    </svg>
                </span>
                <span className="BG" />
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .Btn {
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    position: relative;
    /* overflow: hidden; */
    border-radius: 7px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .svgContainer {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    backdrop-filter: blur(0px);
    letter-spacing: 0.8px;
    border-radius: 10px;
    transition: all 0.3s;
    border: 1px solid rgba(156, 156, 156, 0.466);
  }

  .BG {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background: #e60023;
    z-index: -1;
    border-radius: 10px;
    pointer-events: none;
    transition: all 0.3s;
  }

  .Btn:hover .BG {
    transform: rotate(35deg);
    transform-origin: bottom;
  }

  .Btn:hover .svgContainer {
    background-color: rgba(226, 226, 226, 0.466);
    backdrop-filter: blur(4px);
  }`;

export default Pinterest;