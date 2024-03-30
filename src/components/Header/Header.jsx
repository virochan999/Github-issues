import React from 'react'
import { NavLink } from 'react-router-dom';
import '../Header/Header.scss';
import { Code, CircleDot, GitPullRequest } from 'lucide-react';
const Header = () => {
  return (
    <div className='header__container'>
        <div className='header__top-header'>
            <div className='header__breadcrumbs'>
                <span>facebook</span>
                <span>/</span>
                <span className='header__breadcrumbs-link'>react</span>
                <span className='header__visibility'>Public</span>
            </div>
            <ul>
                <li>Notifications</li>
                <li>
                        <span>Star</span>
                </li>
                <li>Fork</li>
            </ul>
        </div>
        <ul className='header__tabs'>
            <li>
              <NavLink to='/'>
                <Code color="#656d76" size={20}/>
                 <p>Code</p>
              </NavLink>
            </li>
            <li>
                <NavLink to='/issues'>
                <CircleDot color="#656d76" size={20}/>
                    <p>Issues</p>
                </NavLink>
            </li>
            <li>
                <NavLink to='/pullrequest'>
                <GitPullRequest color="#656d76" size={20}/>
                    <p>Pull Request</p>
                </NavLink>
            </li>
        </ul>
    </div>
  )
}

export default Header