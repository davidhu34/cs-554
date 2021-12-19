import React from 'react';
import { useNavigate } from 'react-router';

import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import CheckroomIcon from '@mui/icons-material/Checkroom';
import GroupIcon from '@mui/icons-material/Group';
import LocalLaundryService from '@mui/icons-material/LocalLaundryService';
import ShoppingBasket from '@mui/icons-material/ShoppingBasket';

const navConfigs = [
  {
    key: 'clothes',
    text: 'Clothes',
    to: '/clothes',
    icon: <CheckroomIcon />,
  },
  {
    key: 'baskets',
    text: 'Baskets',
    to: '/baskets',
    icon: <ShoppingBasket />,
  },
  {
    key: 'group',
    text: 'Group',
    to: '/group',
    icon: <GroupIcon />,
  },
  {
    key: 'tasks',
    text: 'Tasks',
    to: '/tasks',
    icon: <LocalLaundryService />,
  },
];

export default function SideBar() {
  const navigate = useNavigate();

  return (
    <Paper Paper square variant="outlined">
      <Typography
        variant="h6"
        component="h1"
        sx={{ padding: 2, cursor: 'pointer' }}
        onClick={() => {
          navigate('/');
        }}
      >
        WashTastic
      </Typography>
      <List>
        {navConfigs.map(({ key, icon, text, to }) => {
          return (
            <ListItem>
              <ListItemButton
                key={key}
                onClick={() => {
                  navigate(to);
                }}
              >
                <ListItemIcon>
                  <Icon>{icon}</Icon>
                </ListItemIcon>
                <ListItemText>{text}</ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
