import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';

import { setFilter } from '../../stores/JobSearch';
import {
  EXPERIENCE,
  MIN_BASE_PAY,
  REMOTE_OPTIONS,
  ROLES,
} from '../../constants';
import './filter.css';

export default function JobFilter() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.searchJob.jobs.filtersList);

  const handleRoleChange = (e, newValue) => {
    dispatch(setFilter({ ...filters, role: newValue }));
  };

  const handleExperienceChange = (e, newValue) => {
    dispatch(setFilter({ ...filters, experience: +newValue }));
  };

  const handleBasePayChange = (e, newValue) => {
    dispatch(
      setFilter({
        ...filters,
        basePay: newValue ? +newValue.replace('L', '') : 0,
      })
    );
  };

  const handleRemoteChange = (e, newValue) => {
    dispatch(setFilter({ ...filters, remote: newValue }));
  };
  const handleCompanyNameChange = (e) => {
    dispatch(setFilter({ ...filters, companyName: e.target.value }));
  };

  return (
    <div className='filter-wrapper'>
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
        <Autocomplete
          onChange={handleRoleChange}
          id='roles'
          fullWidth
          size='small'
          options={ROLES}
          renderInput={({ ...params }) => (
            <TextField label='Roles' {...params} />
          )}
        />
        <Autocomplete
          onChange={handleExperienceChange}
          fullWidth
          id='experience'
          size='small'
          options={EXPERIENCE}
          renderInput={({ ...params }) => (
            <TextField label='Experience' {...params} />
          )}
        />
        <Autocomplete
          onChange={handleBasePayChange}
          fullWidth
          size='small'
          id='minBasePay'
          options={MIN_BASE_PAY}
          renderInput={({ ...params }) => (
            <TextField label='Min Base Pay' {...params} />
          )}
        />
        <Autocomplete
          multiple
          fullWidth
          id='remoteOptions'
          size='small'
          options={REMOTE_OPTIONS}
          renderInput={({ ...params }) => (
            <TextField
              label='Remote or Location'
              placeholder='Remote or Location'
              {...params}
            />
          )}
          onChange={handleRemoteChange}
        />
        <TextField
          placeholder='Search Company Name'
          label='Company Name'
          id='Company Name'
          onChange={handleCompanyNameChange}
          fullWidth
          size='small'
        />
      </Stack>
    </div>
  );
}
