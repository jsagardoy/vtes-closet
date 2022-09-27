import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { User } from 'firebase/auth';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getUser } from '../../../../util';
import SaveIcon from '@mui/icons-material/Save';
import { fetchSelectedVken } from '../../../../service/fetchVken';
import { ProfileType } from '../../../../types/profile_type';
import { updateProfileService } from '../../../../service/updateProfile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const ProfileContainer = () => {
  const user: User = getUser();
  const { userId } = useParams<{ userId: string }>();
  const [showSnackbar, setShowSnackbar] = React.useState<{
    severity: 'error' | 'warning' | 'success' | 'info';
    open: boolean;
    message: string;
  }>({ severity: 'success', open: false, message: '' });

  const [profile, setProfile] = React.useState<ProfileType>({
    name: user.displayName ?? '',
    email: user.email ?? '',
    uid: user.uid,
    vken: '',
    rol: 'user',
  });

  const history = useHistory();

  const closeSnackbar = () => {
    setShowSnackbar((prev) => ({ ...prev, open: false, message: '' }));
  };
  const handleGoBack = () => {
    history.push('/');
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const profile: ProfileType = await fetchSelectedVken();
        setProfile(profile);
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [user.uid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev: ProfileType) => ({ ...prev, vken: e.target.value }));
  };
  const handleSave = async () => {
    const newProfile = {
      ...profile,
    };
    try {
      await updateProfileService(newProfile);
      setShowSnackbar((prev) => ({
        severity: 'success',
        open: true,
        message: 'Data successfully added',
      }));
    } catch (error) {
      setShowSnackbar((prev) => ({
        severity: 'error',
        open: true,
        message: 'Error updating data',
      }));
      throw error;
    }
  };
  if (user.uid === userId) {
    return (
      <Container id='formContainer' sx={{ display: 'flex', minWidth: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginTop: '1.5rem',
          }}
        >
          <IconButton onClick={() => handleGoBack()}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Box
          sx={{ display: 'flex', minWidth: '100%', flexDirection: 'column' }}
        >
          <Box
            id='info'
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',

              gap: '1rem',
            }}
          >
            <TextField
              fullWidth
              id='name'
              label='Name'
              value={user.displayName}
              disabled
            />
            <TextField
              fullWidth
              id='mail'
              label='e-mail'
              value={user.email}
              disabled
            />
            {user && user.photoURL ? (
              <img src={user.photoURL} id='avatar' alt='avatar' />
            ) : null}
          </Box>
          <Box
            id='vken-data'
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            <TextField
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
              id='vken'
              label='Vken'
              value={profile.vken}
            />
            <Button
              sx={{ display: 'flex', gap: '1rem' }}
              onClick={() => handleSave()}
            >
              <SaveIcon />
              <Typography variant='body2'>Save</Typography>
            </Button>
          </Box>
          <Link href='https://www.vekn.net/player-registry'>
            <Typography variant='body1'> Vken user's list</Typography>
          </Link>
          <Snackbar
            open={showSnackbar.open}
            autoHideDuration={3000}
            onClose={closeSnackbar}
          >
            <Alert
              onClose={closeSnackbar}
              severity={showSnackbar.severity}
              sx={{ width: '100%' }}
            >
              {showSnackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    );
  }
  return null;
};

export default ProfileContainer;
