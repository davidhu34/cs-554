import { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import GroupForm from './GroupForm';
import Button from '@mui/material/Button';
import { AuthContext } from '../../application/firebase/auth';
// http://localhost:3001/group (GET)
// http://localhost:3001/group (POST)

const Group = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [groupList, setGroupList] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    let isUnmount = false;
    async function fetchGroup() {
      console.log('here');
      console.log('current USer here:', currentUser);
      try {
        setLoading(true);
        if (currentUser.groupId !== null) {
          const { data } = await Axios.get(
            `http://localhost:3001/group/${currentUser.groupId}`
          );
          // console.log('group with the ID: ' + currentUser.groupId, data);
          if (!isUnmount) {
            setGroup(data);
            setLoading(false);
          }
        }
        if (currentUser.groupId === null) {
          const { data } = await Axios.get('http://localhost:3001/group');
          if (!isUnmount) {
            setGroupList(data);
            setLoading(false);
          }
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
  }, [currentUser.groupId]);

  function joinGroup({ grpId }) {
    // e.preventDefault();
    Axios.put(`http://localhost:3001/group/${grpId}`, currentUser)
      .then((response) => {
        console.log('user added into group', response);
        let updated = response.users.filter((user) => {
          return user._id === currentUser._id ? user : user;
        });
        setCurrentUser(updated);
      })
      .catch((error) => {
        console.log('Join Group Error', error);
      });
  }

  if (loading) return <h2>Loading Group..............</h2>;

  if (group && group && currentUser.groupId !== null) {
    console.log(group);
    return (
      <>
        <Box sx={{ width: '100%', maxWidth: 360 }}>
          <ListItem>
            <ListItemButton>
              <ListItemText primary={group.name} />{' '}
            </ListItemButton>
          </ListItem>
        </Box>
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
                      <Button
                        varient="contained"
                        color="success"
                        onClick={joinGroup({ grpId: group._id })}
                      >
                        Join the Group
                      </Button>
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
