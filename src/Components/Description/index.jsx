import PropTypes from 'prop-types';
import { useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import './description.css';

export default function Description({ jobDetailsFromCompany }) {
  const [toggle, setToggle] = useState(false);

  const handleClickOpen = () => {
    setToggle(true);
  };
  const handleClose = () => {
    setToggle(false);
  };

  return (
    <div className='desc-wrapper'>
      <p className='desc'>{jobDetailsFromCompany}</p>

      <button onClick={handleClickOpen}>
        {toggle ? 'show less' : 'show more'}
      </button>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={toggle}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>About Company</DialogTitle>
        <DialogContent sx={{ m: 0, p: 2 }}>
          {jobDetailsFromCompany}
        </DialogContent>
      </Dialog>
    </div>
  );
}

Description.propTypes = {
  jobDetailsFromCompany: PropTypes.string,
};
