import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const resources = [
  { category: 'Academic', type: 'video', title: 'Learn Anything in 20 Hours', author: 'The RSA', link: 'https://www.youtube.com/watch?v=5MgBikgcWnY', thumbnail: 'https://i3.ytimg.com/vi/5MgBikgcWnY/maxresdefault.jpg', description: 'A fantastic talk on rapid skill acquisition, perfect for learning new subjects quickly.' },
  { category: 'Academic', type: 'website', title: 'Khan Academy', author: 'khanacademy.org', link: 'https://www.khanacademy.org/', thumbnail: 'https://i.imgur.com/S9Y48uD.png', description: 'A non-profit offering free, world-class education for anyone, anywhere. Covers math, science, and more.' },
  { category: 'Well-being', type: 'video', title: 'How to Manage Your Mental Health', author: 'Psych2Go', link: 'https://www.youtube.com/watch?v=3QIfkeA6oEI', thumbnail: 'https://i3.ytimg.com/vi/3QIfkeA6oEI/maxresdefault.jpg', description: 'Practical tips on protecting and managing your mental well-being during stressful times.' },
  { category: 'Well-being', type: 'website', title: 'Headspace for Students', author: 'headspace.com', link: 'https://www.headspace.com/studentplan', thumbnail: 'https://i.imgur.com/uN5z2Jp.png', description: 'Guided meditations, animations, and articles to help with mindfulness and stress, with student discounts.' },
  { category: 'Academic', type: 'video', title: 'The Feynman Technique', author: 'Thomas Frank', link: 'https://www.youtube.com/watch?v=FrNq2VfvI_o', thumbnail: 'https://i3.ytimg.com/vi/FrNq2VfvI_o/maxresdefault.jpg', description: 'A detailed guide on how to learn faster and more deeply by explaining concepts simply.' },
  { category: 'Well-being', type: 'video', title: 'The Power of a Good Night\'s Sleep', author: 'Shai Marcu', link: 'https://www.youtube.com/watch?v=gedoSfZvBgE', thumbnail: 'https://i3.ytimg.com/vi/gedoSfZvBgE/maxresdefault.jpg', description: 'An animated lesson on why sleep is critical for learning, memory, and emotional regulation.' },
  { category: 'Academic', type: 'website', title: 'The Organic Chemistry Tutor', author: 'YouTube Channel', link: 'https://www.youtube.com/c/TheOrganicChemistryTutor', thumbnail: 'https://i.imgur.com/p1a5g3v.png', description: 'An incredible channel with tutorials on chemistry, physics, calculus, and general math.' },
  { category: 'Well-being', type: 'video', title: 'How to Get Your Brain to Focus', author: 'Chris Bailey | TEDx', link: 'https://www.youtube.com/watch?v=Hu4Yvq-g7_Y', thumbnail: 'https://i3.ytimg.com/vi/Hu4Yvq-g7_Y/maxresdefault.jpg', description: 'A practical TED Talk on managing attention, technology, and focus in a distracting world.' },
  { category: 'Academic', type: 'video', title: 'What is Quantum Physics?', author: 'Kurzgesagt – In a Nutshell', link: 'https://www.youtube.com/watch?v=iVpXrbZ4bnU', thumbnail: 'https://i3.ytimg.com/vi/iVpXrbZ4bnU/maxresdefault.jpg', description: 'Complex science explained beautifully with engaging animations. Great for any science student.' },
  { category: 'Academic', type: 'website', title: 'freeCodeCamp', author: 'freecodecamp.org', link: 'https://www.freecodecamp.org/', thumbnail: 'https://i.imgur.com/v2LhG7H.png', description: 'Thousands of hours of free tutorials and certifications for programming and computer science.' },
  { category: 'Well-being', type: 'video', title: 'The single most important parenting strategy', author: 'Dr. Becky Kennedy | Big Think', link: 'https://www.youtube.com/watch?v=c3uaMlk2p0g', thumbnail: 'https://i3.ytimg.com/vi/c3uaMlk2p0g/maxresdefault.jpg', description: 'A 6-minute talk on emotional regulation that is useful for students managing their own feelings.' },
  { category: 'Academic', type: 'video', title: 'The Science of Productivity', author: 'Ali Abdaal', link: 'https://www.youtube.com/watch?v=iCg_la_Jd-k', thumbnail: 'https://i3.ytimg.com/vi/iCg_la_Jd-k/maxresdefault.jpg', description: 'Evidence-based strategies to stop procrastinating and become more productive as a student.' },
];

export default function StudyResources() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const filteredResources = resources.filter(resource => 
    filter === 'All' ? true : resource.category === filter
  );

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold">Curated Student Resources</h2>
        <p className="lead text-muted">Hand-picked videos and websites to help you excel and stay balanced.</p>
      </div>
      <div className="text-center mb-4">
        <div className="btn-group shadow-sm" role="group">
          <button type="button" className={`btn ${filter === 'All' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setFilter('All')}>All Resources</button>
          <button type="button" className={`btn ${filter === 'Academic' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setFilter('Academic')}>Academic</button>
          <button type="button" className={`btn ${filter === 'Well-being' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setFilter('Well-being')}>Well-being</button>
        </div>
      </div>
      <div className="row g-4">
        {filteredResources.map((resource, index) => (
          <div key={index} className="col-lg-4 col-md-6">
            <div className="card h-100 shadow-sm border-0" style={{ transition: 'transform 0.2s' }}>
              <img src={resource.thumbnail} className="card-img-top" alt={resource.title} style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{resource.title}</h5>
                <p className="card-text flex-grow-1">{resource.description}</p>
                <a href={resource.link} target="_blank" rel="noopener noreferrer" className="btn btn-warning mt-auto stretched-link">
                  <span className="material-icons align-middle me-2">{resource.type === 'video' ? 'play_circle' : 'public'}</span>
                  Open Resource
                </a>
              </div>
               <div className={`card-footer bg-${resource.category === 'Academic' ? 'info' : 'success'} bg-opacity-10`}>
                 <small className="text-muted">{resource.category} • by {resource.author}</small>
               </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-5">
          <button className="btn btn-dark" onClick={() => navigate("/")}>Back to Dashboard</button>
      </div>
    </div>
  );
}