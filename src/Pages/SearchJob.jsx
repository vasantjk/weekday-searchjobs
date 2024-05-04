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
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (data) {
      dispatch(updateJobs(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    refetch();
  }, [offset, refetch]);

  return (
    <>
      <JobFilter />
      {!isLoading && !isError && <JobCards />}
      {(isLoading || isFetching) && <CircularProgress />}
    </>
  );
}
