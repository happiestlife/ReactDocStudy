import React from 'react';
import { Link } from 'react-router-dom';

const LeftMenu = () => {
	return (
        <div className='sidebar'>
            <div className='link'>
                <Link to='/section/1'>Section1</Link>
            </div>
            <div className='link'>
                <Link to='/section/2'>Section2</Link>
            </div>
            <div className='link'>
                <Link to='/section/3'>Section3</Link>
            </div>
            <div className='link'>
                <Link to='/section/4'>Section4</Link>
            </div>
        </div>
	);
};

export default LeftMenu;