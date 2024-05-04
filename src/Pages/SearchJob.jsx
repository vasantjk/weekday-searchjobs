import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { updateJobs } from '../stores/JobSearch';
import JobCards from '../Components/Card';
import JobFilter from '../Components/Filters';
import { fetchJobs } from '../api';

export default function SearchJob() {
  const dispatch = useDispatch();
  const offset = useSelector((state) => state.searchJob.jobs.offset);

  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    'fetchJobs',
    () => fetchJobs(offset),
    {
      // when switching tabs this will call api to prevent passing this property
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    // whenever the data is fetched need to update in store
    if (data) {
      dispatch(updateJobs(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    // offset changes then we are calling jobs api to get more jobs
    refetch();
  }, [offset, refetch]);

  return (
    <>
      <JobFilter />
      {isError && <h2>Something Went wrong </h2>}
      {!isLoading && !isError && <JobCards />}
      {(isLoading || isFetching) && <CircularProgress />}
    </>
  );
}
