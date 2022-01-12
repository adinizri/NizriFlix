import logo from '../../Images/NizriFlix_Logo.png';
import { useState, useEffect } from 'react';
import './Logo.scss';

const Logo = () => {
    return (<div className='logoContainer' ><img src={ logo }></img></div>);
};

export default Logo;