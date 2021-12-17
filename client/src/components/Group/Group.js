import { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import GroupForm from './GroupForm';
import { AuthContext } from '../../application/firebase/auth';
// http://localhost:3001/group (GET)
// http://localhost:3001/group (POST)

const Group = () => {
  const { currentUser } = useContext(AuthContext);
  const [groupList, setGroupList] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGroup() {
      try {
        setLoading(false);
        const { data } = await Axios.get('http://localhost:3001/group');
        if (data) {
          setGroupList(data);
          setLoading(false);
        }
      } catch (error) {
        console.log('group error:', error);
      }
    }
    fetchGroup();
  }, [groupList]);

  if (loading) return <h2>Loading Group..............</h2>;
  return (
    <>
      <GroupForm />
      <Box sx={{ width: '100%', maxWidth: 360 }}>
        <nav aria-label="main">
          {groupList &&
            groupList.map((group) => (
              <List key={group._id}>
                <ListItem>
                  <ListItemButton>
                    <ListItemText primary={group.name} />
                  </ListItemButton>
                </ListItem>
              </List>
            ))}
        </nav>
        <button>Add Group</button>
      </Box>
    </>
  );
};

export default Group;
