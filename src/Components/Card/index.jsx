import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './job-cards.css';
import { updateOffset } from '../../stores/JobSearch';
import Description from '../Description';

export default function JobCards() {
  const hasFilter = useSelector((state) => state.searchJob.jobs.hasFilter);
  const jdList = useSelector(
    (state) => state.searchJob.jobs[hasFilter ? 'filtered' : 'jdList']
  );
  const dispatch = useDispatch();
  const observer = useRef();

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !hasFilter) {
          dispatch(updateOffset(10));
        }
      },
      { threshold: 1 }
    );

    if (observer.current) {
      observer.current.observe(document.getElementById('observer'));
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [dispatch, hasFilter]);

  const renderJobCards = () => {
    return jdList.map(
      ({
        jdUid,
        minJdSalary,
        maxJdSalary,
        jobRole,
        location,
        jobDetailsFromCompany,
        minExp,
        jdLink,
      }) => (
        <div className='jd-list' key={jdUid}>
          <section className='company'>
            <img
              width='50px'
              height='50px'
              src='https://storage.googleapis.com/weekday-assets/airtableAttachment_1713598325603_7ico7.jpg'
              alt='company'
            />
            <h4>{jobRole}</h4>
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
    </>
  );
}
