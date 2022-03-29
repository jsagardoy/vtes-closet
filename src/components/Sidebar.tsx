import { List } from '@material-ui/core';
import { ListItemButton, ListItemText } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { useHistory } from 'react-router-dom';

import './Sidebar.css';

interface Props {
  toogle: boolean;
}

const Sidebar = (props: Props) => {
  const { toogle } = props;
  const auth = getAuth();
  const [user, setUser] = React.useState<any>(auth);
  const history: any = useHistory();

  onAuthStateChanged(auth, (us) => {
    if (us) {
      setUser(us);
    } else {
      setUser(null);
    }
  });

  const handleClick = (cardType: string) => {
    switch (cardType) {
      case 'Crypt':
        history.push('/crypt');
        break;
      case 'Library':
        history.push('/library');
        break;
      default:
        console.log('por otro lado');
        break;
    }
  };

  return (
   <div
      className={toogle ? "sidebar" : "hidden"}>
     <div className='list__container'>
       <List className='list'>
         <ListItemButton
           alignItems='flex-start'
           dense
           divider
           style={{ borderBottomColor: 'darkcyan' }}
           onClick={() => handleClick('Crypt')}
         >
           <ListItemText primary='Crypt' />
         </ListItemButton>
         <ListItemButton
           alignItems='flex-start'
           dense
           divider
           style={{ borderBottomColor: 'darkcyan' }}
           onClick={() => handleClick('Library')}
         >
           <ListItemText primary='Library' />
         </ListItemButton>
         {user ? (
           <div className='privateSidebar'>
             <ListItemButton
               alignItems='flex-start'
               dense
               divider
               style={{ borderBottomColor: 'darkcyan' }}
             >
               <ListItemText primary='Decks' />
             </ListItemButton>
             <ListItemButton
               className='listItem'
               alignItems='flex-start'
               dense
               divider
               style={{ borderBottomColor: 'darkcyan' }}
             >
               <ListItemText
                 className={'listItemText'}
                 primary='Crypt Collection'
                 secondaryTypographyProps={{
                   color: 'darkcyan',
                 }}
               />
             </ListItemButton>
             <ListItemButton
               alignItems='flex-start'
               dense
               divider
               style={{ borderBottomColor: 'darkcyan' }}
             >
               <ListItemText
                 className={'listItemText'}
                 primary='Library Collection'
                 secondaryTypographyProps={{
                   color: 'darkcyan',
                 }}
               />
             </ListItemButton>
           </div>
         ) : (
           <></>
         )}
       </List>
     </div>
   </div>
 );
 
}
   export default Sidebar;