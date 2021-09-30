import { Avatar} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import './Header.css';

const Header = () => {
  return (
    <div className='header'>
      <div className='header__left'>
        <Menu fontSize='large' style={{ fill: 'darkcyan' }} />
        <img
          src='https://sites.google.com/site/ausnzvteschampionship/_/rsrc/1361307183822/home/2013/Casino-Playing-Cards-icon%20VTESlogo.jpg?height=320&width=320'
          alt='logo'
        />
      </div>
      <div className='header__center'>
        <h3>Vtes Closet</h3>
      </div>
      <div className='header__right'>

        <Avatar variant='circular' alt='avatar'>
          N
        </Avatar>
      </div>
    </div>
  );
};

export default Header;
