import React from 'react'; 
import logo from '../assets/images/logo.png'; 

export default function Header() {
    return (
        <header className="header">
            <nav>
                <div className="logo">
                    <img src={logo} alt="logo"/>
                </div>
            </nav>
        </header>
    )
}
