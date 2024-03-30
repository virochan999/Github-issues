import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Issues.scss';
import dotCircleIcon from '../../icons/dot-circle.svg'
import dotCircleGreenIcon from '../../icons/dot-circle-green.svg'
import { MessageSquare, CircleDot } from 'lucide-react';

const Issues = () => {
    const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openIssueCount, setOpenIssueCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.github.com/repos/facebook/react/issues?page=${page}`);
        setIssues(prevIssues => [...prevIssues, ...response.data]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1 &&
      !loading
    ) {
      setPage(prevPage => prevPage + 1);
    }
    console.log("page",  window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight)
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const openIssues = issues.filter(issue => issue.state === 'open');
    setOpenIssueCount(openIssues.length);
  }, [issues]);

  const calculateTimeElapsed = createdAt => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const elapsedMilliseconds = currentDate - createdDate;
    const elapsedDays = Math.floor(elapsedMilliseconds / (1000 * 60 * 60 * 24));
    if (elapsedDays === 0) {
      return 'today';
    } else if (elapsedDays === 1) {
      return '1 day ago';
    } else if (elapsedDays < 7) {
      return `${elapsedDays} days ago`;
    } else {
      const elapsedWeeks = Math.floor(elapsedDays / 7);
      return `${elapsedWeeks} week${elapsedWeeks > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="issues">
        <div className='issues__table-head'>
            <div className='issues__table-head-left'>
            <img src={dotCircleIcon} alt='dot-icon' className='issues__title-icon-img'/>
                <span className='issues__open-count'>{openIssueCount}</span>
                <span className='issues__open-title'>Open</span>
                <span className='issues__closed-items'>3062 Closed</span>
            </div>
            <ul className='issues__header-toggle'>
                <li>Author</li>
                <li>Label</li>
                <li>Projects</li>
                <li>Milestones</li>
                <li>Assignee</li>
                <li>Sort</li>
            </ul>
        </div>
        <div className='issues__table-container'>
        {issues.map(issue => (
          <div key={issue.id} className='issues__row'>
            <div>
              <img src={dotCircleGreenIcon} alt='dot-icon' className='issues__title-icon-img'/>
            </div>
            <div className='issues__list'>
                <div className='issues__title-status-container'>
                  <div className='issues__name-container'>
                      <a href={issue.url}>
                              <h3 className='issues__title'>{issue.title}</h3>
                      </a>
                      <div className='issues__status-container'>
                          {
                              issue.labels.map((status)=>(
                                  <a href={status.url} key={status.id}>
                                    <p style={{ backgroundColor: `#${status.color}`}} className='issues__status'>{status.name}</p>
                                  </a>
                              ))
                          }
                      </div>
                  </div>
                  <div className='issues__comments-container'>
                      <a href={issue.comments_url}>
                          <MessageSquare color="#656d76"/>
                      </a>
                      <span className='issues__comment-count'>{issue.comments}</span>
                  </div>
                </div>
              <div className='issues__id-date-container'>
                <span className='issues__issue-id'>#{issue.number}</span>
                <span>opened {calculateTimeElapsed(issue.created_at)} by <a href={issue.user.url}>{issue.user.login}</a></span>
            </div>
            </div>
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  )
}

export default Issues