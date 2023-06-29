import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface ActionsMenuProps {
  onSaveSession: () => void;
  onResetSession: () => void;
}

export default function ActionsMenu({ onSaveSession, onResetSession }: ActionsMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSaveSession = () => {
    onSaveSession();
    handleClose();
  };

  const handleResetSession = () => {
    onResetSession();
    handleClose();
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Actions
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleSaveSession}>Save Session</MenuItem>
        <MenuItem onClick={handleResetSession}>Reset Session</MenuItem>
      </Menu>
    </div>
  );
}
