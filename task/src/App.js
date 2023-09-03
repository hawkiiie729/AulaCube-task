import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('');
  

  useEffect(() => {
    // Fetch comments from the API
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(data => setComments(data.slice(0, 100))); // Limit to 100 comments
  }, []);
  
console.log('====================================');
console.log("commrnt",comments);
console.log('====================================');

// Group comments by postId
const postComments = {};
comments.forEach(comment => {
  if (!postComments[comment.postId]) {
    postComments[comment.postId] = comment;
  }
});
console.log("postComments",postComments);

const handleFilterChange = event => {
  setFilter(event.target.value);
};

// Filter comments based on the postId
const filteredComments = Object.values(postComments).filter(comment =>
  comment.postId.toString().includes(filter)
);  

// Render the posts on the left side
// const leftSide = (
//   <div>
//     <div>
//       <h2>Posts</h2>
//       <input
//         type="text"
//         placeholder="Filter by postId"
//         value={filter}
//         onChange={handleFilterChange}
//       />
//       <ul>
//         {filteredComments.map(comment => (
//           <li key={comment.id}>{comment.body}</li>
//         ))}
//       </ul>
//     </div>
//   </div>
// );




  return (
    <div className="App">
     <h2>Posts</h2>
      <input
        type="text"
        placeholder="Filter by postId"
        value={filter}
        onChange={handleFilterChange}
      />
      <ul>
        {filteredComments.map(comment => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
