import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { IonIcon } from '@ionic/react';
import { cartOutline } from 'ionicons/icons';

function Header() {
    return (
        <header>
            <div></div>
            <nav>
                <ul>
                    <li>Home</li>
                    <li>Shop</li>
                    <li>About</li>
                    <li>Blog</li>
                    <li>Contact</li>
                </ul>
            </nav>
            <div className="nav-icons">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="icon search-icon" />
                <FontAwesomeIcon icon={faCircleUser} className="icon user-icon" />
                <IonIcon icon={cartOutline} />
            </div>
        </header>
    )
}

export default Header