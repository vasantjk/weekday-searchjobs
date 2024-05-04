import { createSlice } from '@reduxjs/toolkit';

import {
  minFilter,
  SingleFilter,
  isEmpty,
  isFilter,
  multiFilter,
  searchFilter,
} from '../../utils';

const initialState = {
  jobs: {
    jdList: [],
    totalCount: 0,
    offset: 10,
    filtered: [],
    filtersList: {
      role: '',
      experience: 0,
      remote: [],
      basePay: 0,
      companyName: '',
    },
    hasFilter: false,
  },
};

const handleFilter = (state) => {
  let totalFilter = state.jdList;
  const { role, experience, basePay, remote, companyName } = state.filtersList;

  if (!isEmpty(role)) {
    totalFilter = SingleFilter(totalFilter, role, 'jobRole');
  }

  if (!isEmpty(experience)) {
    totalFilter = minFilter(totalFilter, experience, 'minExp');
  }

  if (!isEmpty(basePay)) {
    totalFilter = minFilter(totalFilter, basePay, 'minJdSalary');
  }

  if (!isEmpty(remote)) {
    totalFilter = multiFilter(totalFilter, remote, 'location');
  }

  if (!isEmpty(companyName)) {
    totalFilter = searchFilter(totalFilter, companyName, 'companyName');
  }

  return totalFilter;
};

const JobSlice = createSlice({
  name: 'jobDetails',
  initialState,
  reducers: {
    updateJobs: (state, action) => {
      if (action.payload) {
        const { totalCount, jdList } = action.payload;
        state.jobs.totalCount = totalCount;
        state.jobs.jdList.push(...jdList);
      }
    },
    updateOffset: (state, action) => {
      state.jobs.offset += action.payload;
    },
    setFilter: (state, action) => {
      const { role, experience, basePay, remote, companyName } = action.payload;

      state.jobs.filtersList.role = role ?? '';
      state.jobs.filtersList.experience = experience ?? 0;
      state.jobs.filtersList.basePay = basePay ?? 0;
      state.jobs.filtersList.remote = remote ?? [];
      state.jobs.filtersList.companyName = companyName ?? '';
      state.jobs.hasFilter = isFilter(state.jobs.filtersList);

      state.jobs.filtered = handleFilter(state.jobs);
    },
  },
});

export const { updateJobs, updateOffset, setFilter } = JobSlice.actions;

export default JobSlice.reducer;
