"use client";

import React from 'react';
import styled from 'styled-components';

interface ModelButtonProps {
    id: string;
    short: string;
    color: string;
    icon: React.ReactNode;
    isSelected: boolean;
    onClick: () => void;
}

export default function ModelButton({ id, short, color, icon, isSelected, onClick }: ModelButtonProps) {
    return (
        <StyledWrapper>
            <button
                type="button"
                className={`brutalist-button ${isSelected ? 'selected' : ''}`}
                onClick={onClick}
                style={{ '--provider-color': color } as React.CSSProperties}
            >
                <div className="logo-circle" style={{ backgroundColor: color }}>
                    {icon}
                </div>
                <div className="button-text">
                    <span>Powered By</span>
                    <span>{short}</span>
                </div>
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .brutalist-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffffff; 
    border: 3px solid #000000;
    border-radius: 12px;
    padding: 0;
    text-decoration: none;
    color: #000000;
    font-weight: bold;
    position: relative;
    box-shadow: 4px 4px 0px #000000;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    height: 130px;
    width: 130px;
    cursor: pointer;
  }

  .brutalist-button::before {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -150%;
    width: 300%;
    height: 300%;
    border-radius: 50%;
    transform: translateX(-50%) scale(0);
    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
    z-index: 1;
    background-color: var(--provider-color);
  }

  .brutalist-button:hover::before,
  .brutalist-button.selected::before {
    transform: translateX(-50%) scale(1);
  }

  .brutalist-button:hover,
  .brutalist-button.selected {
    transform: translate(-4px, -4px);
    box-shadow: 8px 8px 0px #000000;
  }

  .brutalist-button:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #000000;
  }

  .logo-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  .provider-icon {
    width: 50px;
    height: 50px;
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }

  .brutalist-button:hover .logo-circle,
  .brutalist-button.selected .logo-circle {
    animation: spin 5s linear infinite;
    width: 50px;
    height: 50px;
    top: 28%;
    border: 2px solid #ffffff;
  }

  .brutalist-button:hover .provider-icon,
  .brutalist-button.selected .provider-icon {
    transform: scale(0.6);
  }

  .button-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.3;
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    text-align: center;
    opacity: 0;
    transform: translateY(20px);
    z-index: 2;
    position: absolute;
    bottom: 18px;
    left: 0;
    right: 0;
  }

  .button-text span:first-child {
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 2px;
    color: #ffffff;
  }

  .button-text span:last-child {
    font-size: 16px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #ffffff;
  }

  .brutalist-button:hover .button-text,
  .brutalist-button.selected .button-text {
    opacity: 1;
    transform: translateY(0);
  }
`;