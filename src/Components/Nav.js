import {Link} from 'react-router-dom';
import './Nav.css';

function Nav() {
    const navStyle = {
        color: 'white',
        textDecoration: 'none',
        fontSize: '20px',
    };

    const titleStyle = {
        color: 'lightgreen',
        fontSize: '24px'
    }

    return (
        <nav>
            <div style={titleStyle} className="logo">
				Recipe App
			</div>

            <ul className='nav-links'>
                <Link style={navStyle} to='/'>
                    <li> Home </li>
                </Link>
                <Link style={navStyle} to='/about'>
                    <li> About </li>
                </Link>
            </ul>
        </nav>
    );
  }
  
  export default Nav;
  