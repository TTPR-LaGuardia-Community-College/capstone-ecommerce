// import React, { useState } from 'react';

// const SearchBar = ({ onSearch }) => {
//   const [query, setQuery] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch(query);
//   };

//   return (
//     <form onSubmit={handleSubmit} style={styles.form}>
//       <input
//         type="text"
//         placeholder="Search for books, gadgets, notes..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         style={styles.input}
//       />
//       <button type="submit" style={styles.button}>Search</button>
//     </form>
//   );
// };

// const styles = {
//   form: {
//     display: 'flex',
//     justifyContent: 'center',
//     marginBottom: '2rem'
//   },
//   input: {
//     width: '300px',
//     padding: '0.6rem',
//     fontSize: '1rem',
//     border: '1px solid #ccc',
//     borderRadius: '5px 0 0 5px'
//   },
//   button: {
//     padding: '0.6rem 1rem',
//     backgroundColor: '#2e8b57',
//     color: 'white',
//     border: 'none',
//     borderRadius: '0 5px 5px 0',
//     cursor: 'pointer'
//   }
// };

// export default SearchBar;

import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(q);
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search products…"
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
