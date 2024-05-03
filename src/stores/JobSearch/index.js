import { createSlice } from '@reduxjs/toolkit';

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
    },
    hasFilter: false,
  },
};

export const fetchJobs = async (offset) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    limit: 10,
    offset,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };

  const response = (
    await fetch(
      'https://api.weekday.technology/adhoc/getSampleJdJSON',
      requestOptions
    )
  ).json();
  const data = await response;
  return data;
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
  },
});

export const { updateJobs, updateOffset, setFilter, updateLoading } =
  JobSlice.actions;

export default JobSlice.reducer;
