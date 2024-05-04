import { useSelector } from 'react-redux';

export default function NoJobs() {
  const hasFilter = useSelector((state) => state.searchJob.jobs.hasFilter);
  const filteredJobs = useSelector((state) => state.searchJob.jobs.filtered);

  if (!(hasFilter && filteredJobs.length == 0)) {
    return null;
  }
  return (
    <div>
      <img
        src='https://jobs.weekday.works/_next/static/media/nothing-found.4d8f334c.png'
        alt='no-jobs'
        width='250px'
        height='250px'
      />
      <h3> No Jobs available for this category at the moment</h3>
    </div>
  );
}
