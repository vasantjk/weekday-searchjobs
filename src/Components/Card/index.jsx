import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './job-cards.css';
import { updateOffset } from '../../stores/JobSearch';
import Description from '../Description';
import NoJobs from '../Nojobs';

export default function JobCards() {
  const hasFilter = useSelector((state) => state.searchJob.jobs.hasFilter);

  // when the user applies any filter we should show the filtered data if no filter show original datas
  const jdList = useSelector(
    (state) => state.searchJob.jobs[hasFilter ? 'filtered' : 'jdList']
  );
  const dispatch = useDispatch();
  const observer = useRef();

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        /* when the observer is intersection we update the offset
         * and when there is any filter applied we dont need to load more jobs
         */
        if (firstEntry.isIntersecting && !hasFilter) {
          dispatch(updateOffset(10));
        }
      },
      { threshold: 1 }
    );

    if (observer.current) {
      observer.current.observe(document.getElementById('observer'));
    }

    // clean up function when the component is unmounted
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [dispatch, hasFilter]);

  const renderJobCards = () => {
    return jdList.map(
      ({
        minJdSalary,
        maxJdSalary,
        jobRole,
        location,
        jobDetailsFromCompany,
        minExp,
        jdLink,
        companyName,
        logoUrl,
      }) => (
        <div
          className='jd-list'
          key={`${companyName}_${minJdSalary}_${maxJdSalary}`}
        >
          <section className='company'>
            <img
              width='50px'
              height='50px'
              loading='lazy'
              src={logoUrl}
              alt='company'
            />
            <hgroup>
              <h4>{companyName}</h4>
              <h5>{jobRole}</h5>
            </hgroup>
          </section>

          <p className='salary'>
            Estimated Salary {minJdSalary} - {maxJdSalary} LPA ✅
          </p>

          <span className='location'>{location}</span>

          <h4>About Company</h4>
          <Description jobDetailsFromCompany={jobDetailsFromCompany} />

          <span className='experience'>
            Minimum Experience
            <p>{minExp} years</p>
          </span>

          <a className='jdlink' href={jdLink}>
            Apply
          </a>
        </div>
      )
    );
  };

  return (
    <>
      <div className='jd-wrapper'>{renderJobCards()}</div>
      <div id='observer' />
      <NoJobs />
    </>
  );
}
