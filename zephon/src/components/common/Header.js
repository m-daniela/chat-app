import React from 'react';

const Header = ({title}) => {
    return (
        <nav className="header">
            <span>{title}</span>
        </nav>
    );
};

export default Header;
