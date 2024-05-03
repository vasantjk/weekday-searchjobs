import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { fetchJobs, updateJobs } from '../stores/JobSearch';
import JobCards from '../Components/Card';

export default function SearchJob() {
  const dispatch = useDispatch();
  const offset = useSelector((state) => state.searchJob.jobs.offset);

  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    'fetchJobs',
    () => fetchJobs(offset),
    { refetchOnWindowFocus: false }
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
      {!isLoading && !isError && <JobCards />}
      {(isLoading || isFetching) && <CircularProgress />}
    </>
  );
}
