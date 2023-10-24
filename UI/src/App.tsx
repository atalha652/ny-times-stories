import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface Story {
  title: string;
  abstract: string;
  multimedia: { url: string }[];
  url: string;
}

const App: React.FC = () => {
  const [topStories, setTopStories] = useState<Story[]>([]);

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const response = await axios.get<Story[]>('http://localhost:5000/top-stories');
        setTopStories(response.data);
      } catch (error) {
        console.error('Error fetching top stories:', error);
      }
    };

    fetchTopStories();
  }, []);

  return (
    <div className="container">
      <h1 className=" mb-4">New York Times Top Stories</h1>
      <div className="row mt-4">
        {topStories.map((story) => (
          <div className="col-lg-4 mb-4" key={story.title}>
            <div className="card">
              <img src={story.multimedia[0].url} className="card-img-top" alt={story.title} />
              <div className="card-body">
                <h5 className="card-title">{story.title}</h5>
                <p className="card-text">{story.abstract}</p>
                <a href={story.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;