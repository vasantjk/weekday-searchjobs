import PropTypes from 'prop-types';
import { useState } from 'react';

import './description.css';

export default function Description({ jobDetailsFromCompany }) {
  const [toggle, setToggle] = useState(false);

  return (
    <div className='desc-wrapper'>
      <p className='desc' data-expand={toggle}>
        {jobDetailsFromCompany}
      </p>

      <button onClick={() => setToggle((prev) => !prev)}>
        {toggle ? 'show less' : 'show more'}
      </button>
    </div>
  );
}

Description.propTypes = {
  jobDetailsFromCompany: PropTypes.string,
};
