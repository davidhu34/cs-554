import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

export default function DataModal({
  open,
  title,
  description,
  children,
  onClose,
  error,
  loading = false,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {title && (
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
        )}
        {loading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography color="error">
              {error?.message || 'Error fetching table data'}
            </Typography>
          </Box>
        )}
        {description && (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
        )}
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  );
}
