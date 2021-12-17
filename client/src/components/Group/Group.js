import { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import Box from '@mui/material/Box';
import { Container, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import GroupForm from './GroupForm';
import Button from '@mui/material/Button';
import { AuthContext } from '../../application/firebase/auth';
import { useNavigate } from 'react-router-dom';
// http://localhost:3001/group (GET)
// http://localhost:3001/group (POST)

const Group = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [groupList, setGroupList] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [group, setGroup] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isUnmount = false;
    async function fetchGroup() {
      console.log('here');
      console.log('current USer here:', currentUser);
      try {
        setLoading(true);
        if (currentUser.groupId !== null) {
          console.log(`groupID: ${currentUser.groupId}`);
          const { data } = await Axios.get(
            `http://localhost:3001/group/${currentUser.groupId}`
            // {
            //   withCredentials: true,
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            // }
          );
          // console.log('group with the ID: ' + currentUser.groupId, data);
          if (!isUnmount) {
            setGroup(data);
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setError('Error while FEtching Group List');
      }
    }
    fetchGroup();
    return () => {
      isUnmount = true;
    };
  }, [currentUser]);

  useEffect(() => {
    let isUnmount = false;
    async function fetchGroup() {
      try {
        const { data } = await Axios.get('http://localhost:3001/group/', {
          /*withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },*/
        });
        console.log(data);
        if (!isUnmount && data) {
          setGroupList(data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log('group Fetch Error', error);
        setLoading(false);
      }
    }
    fetchGroup();
    return () => {
      isUnmount = true;
    };
  }, [currentUser.groupId]);

  //Join Group Function
  function joinGroup({ grpId }) {
    // e.preventDefault();
    setLoading(true);
    Axios.put(`http://localhost:3001/group/${grpId}`, currentUser)
      .then((response) => {
        console.log('user added into group', response);
        let updated = response.data.users.filter((user) => {
          return user._id === currentUser._id ? user : user;
        });
        console.log('updated', updated[0]);
        setCurrentUser(updated[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Join Group Error', error);
        setLoading(false);
      });
    setLoading(false);
  }

  // Leave Group Function
  async function leaveGroup(grpId) {
    // alert(JSON.stringify(currentUser));
    try {
      const { data } = await Axios.post(
        `http://localhost:3001/group/user/${grpId}`,
        currentUser
      );
      if (data) {
        setCurrentUser(() => (currentUser.groupId = null));
        setLoading(false);
        navigate('/');
      }
      setLoading(false);
      console.log('Data after user leave the group', data);
    } catch (error) {
      setError('Error While Leaving Group');
      setLoading(false);
    }
  }

  if (loading) return <h2>Loading Group..............</h2>;

  if (group && group && currentUser.groupId !== null) {
    console.log(group);
    return (
      <>
        <Container fixed>
          <Box sx={{ width: '100%', maxWidth: 500 }}>
            {error && error ? (
              <Alert variant="outlined" severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            ) : (
              <></>
            )}
            <Typography variant="h1" component="div" gutterBottom>
              {group.name.toUpperCase()}
            </Typography>
            <Typography variant="h2" component="div">
              Group Members
            </Typography>
            <hr />
            {group.users.map((user) => (
              <Container key={user._id}>
                <Typography variant="h4" component="h3">
                  {user.name}
                </Typography>
              </Container>
            ))}
            <hr />
            <Button
              variant="contained"
              color="error"
              onClick={() => leaveGroup(group._id)}
            >
              Leave Group - {group.name}
            </Button>
          </Box>
        </Container>
      </>
    );
  }

  if (currentUser && currentUser && currentUser.groupId === null) {
    return (
      <>
        {/* {currentUser.groupId !== null ? <></> : <GroupForm />} */}
        <GroupForm />
        <Box sx={{ width: '100%', maxWidth: 360 }}>
          <nav aria-label="main">
            {groupList &&
              currentUser.groupId === null &&
              groupList.map((group) => (
                <List key={group._id}>
                  <ListItem>
                    <ListItemButton>
                      <ListItemText primary={group.name} />{' '}
                      {currentUser && currentUser.groupId === null && (
                        <Button
                          varient="contained"
                          color="success"
                          onClick={() => joinGroup({ grpId: group._id })}
                        >
                          Join the Group
                        </Button>
                      )}
                    </ListItemButton>
                  </ListItem>
                </List>
              ))}
          </nav>
        </Box>
      </>
    );
  }

  return <h2>No Group Available</h2>;
};

export default Group;
