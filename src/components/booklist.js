import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../CSS/Booklist.css';
import Nav1 from './nav1';
import Cart from './cart';

const BookList = ({ addToCart }) => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const observer = useRef();

  useEffect(() => {
    fetchBooks();
  }, [currentPage, sortOption]);

  useEffect(() => {
    if (searchTerm !== '') {
      setCurrentPage(1);
      setBooks([]);
      fetchBooks();
    }
  }, [searchTerm]);

  useEffect(() => {
    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    });

    if (observer.current && isLoading) {
      observer.current.observe(document.getElementById('observer'));
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isLoading]);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
      );
      const booksData = response.data.items;

      setBooks((prevBooks) => [...prevBooks, ...booksData]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setIsLoading(false);
    }
  };

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setBooks([]);
    fetchBooks();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
    setBooks([]);
    fetchBooks();
  };

  return (
    <div>
      <Nav1 />

      <ul className="book-list">
        <h1>Book List</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter the book title"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearch}>Search</button>
          <br /> <br /> <br />
          <div className="sort-container">
            <label htmlFor="sort">Sort:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={handleSortOptionChange}
              className="sort-bar"
            >
              <option value="">Sort By</option>
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
        {books.map((book, index) => {
          const { id, volumeInfo } = book;
          const { title, authors, categories, publishedDate } = volumeInfo;

          return (
            <li key={id} className="book-container">
              <div className="left-cont">
                <h3 className="book-title">{title}</h3>
                <p className="book-info">Author(s): {authors ? authors.join(', ') : 'N/A'}</p>
                <p className="book-info">Genre(s): {categories ? categories.join(', ') : 'N/A'}</p>
                <p className="book-info">Published Date: {publishedDate ? publishedDate : 'N/A'}</p>
              </div>
              <button className="button-btn" onClick={() => addToCart(book)}>
                Add to Cart
              </button>
            </li>
          );
        })}
        <li id="observer" style={{ height: '10px' }}></li>
        {isLoading && <p>Loading...</p>}
      </ul>
    </div>
  );
};

export default BookList;



// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import '../CSS/Booklist.css';
// import Nav1 from './nav1';

// const BookList = ({ addToCart }) => {
//   const [books, setBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [sortOption, setSortOption] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const itemsPerPage = 10;

//   const observer = useRef(null);
//   const lastBookRef = useRef(null);

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   useEffect(() => {
//     if (observer.current) observer.current.disconnect();
//     observeLastBook();
//   }, [books, searchResults]);

//   const observeLastBook = () => {
//     observer.current = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting && currentPage < totalPages) {
//         setCurrentPage((prevPage) => prevPage + 1);
//       }
//     });

//     if (lastBookRef.current) observer.current.observe(lastBookRef.current);
//   };

//   useEffect(() => {
//     const results = searchResults.slice(0, currentPage * itemsPerPage);
//     setBooks(results);
//   }, [searchResults, currentPage]);

//   const fetchBooks = async () => {
//     try {
//       const response = await axios.get("https://www.googleapis.com/books/v1/volumes?q=''");
//       const booksData = response.data.items;
//       const totalResults = booksData.length;
//       setTotalPages(Math.ceil(totalResults / itemsPerPage));
//       setSearchResults(booksData);
//     } catch (error) {
//       console.error('Error fetching books:', error);
//     }
//   };

//   const handleSearch = () => {
//     const results = searchResults.filter((book) => {
//       const { volumeInfo } = book;
//       const { title } = volumeInfo;
//       return title.toLowerCase().includes(searchTerm.toLowerCase());
//     });
//     setTotalPages(Math.ceil(results.length / itemsPerPage));
//     setSearchResults(results);
//     setCurrentPage(1);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSortOptionChange = (e) => {
//     const option = e.target.value;
//     setSortOption(option);
//     let sortedResults = [...searchResults];

//     if (option === 'author') {
//       sortedResults.sort((a, b) => {
//         const authorA = a.volumeInfo.authors ? a.volumeInfo.authors[0] : '';
//         const authorB = b.volumeInfo.authors ? b.volumeInfo.authors[0] : '';
//         return authorA.localeCompare(authorB);
//       });
//     } else if (option === 'date') {
//       sortedResults.sort((a, b) => {
//         const dateA = a.volumeInfo.publishedDate ? a.volumeInfo.publishedDate : '';
//         const dateB = b.volumeInfo.publishedDate ? b.volumeInfo.publishedDate : '';
//         return dateA.localeCompare(dateB);
//       });
//     } else if (option === 'title') {
//       sortedResults.sort((a, b) => {
//         const titleA = a.volumeInfo.title ? a.volumeInfo.title : '';
//         const titleB = b.volumeInfo.title ? b.volumeInfo.title : '';
//         return titleA.localeCompare(titleB);
//       });
//     }

//     setSearchResults(sortedResults);
//     setCurrentPage(1);
//   };

//   return (
//     <div>
//       <Nav1 />

//       <ul className="book-list">
//         <h1>Book List</h1>
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Enter the book title"
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//           <button onClick={handleSearch}>Search</button>
//           <br /><br /><br />
//           <div className="sort-container">
//             <label htmlFor="sort">Sort:</label>
//             <select
//               id="sort"
//               value={sortOption}
//               onChange={handleSortOptionChange}
//               className="sort-bar"
//             >
//               <option value="">Sort By</option>
//               <option value="author">Author</option>
//               <option value="date">Publishing Date</option>
//               <option value="title">Title</option>
//             </select>
//           </div>
//         </div>

//         {books.map((book, index) => {
//           const { id, volumeInfo } = book;
//           const { title, authors, categories, publishedDate } = volumeInfo;

//           if (index === books.length - 1) {
//             return (
//               <li key={id} className="book-container" ref={lastBookRef}>
//                 <div className="left-cont">
//                   <h3 className="book-title">{title}</h3>
//                   <p className="book-info">Author(s): {authors ? authors.join(', ') : 'N/A'}</p>
//                   <p className="book-info">Genre(s): {categories ? categories.join(', ') : 'N/A'}</p>
//                   <p className="book-info">Published Date: {publishedDate ? publishedDate : 'N/A'}</p>
//                 </div>
//                 <button className="button-btn" onClick={() => addToCart(book)}>
//                   Add to Cart
//                 </button>
//               </li>
//             );
//           } else {
//             return (
//               <li key={id} className="book-container">
//                 <div className="left-cont">
//                   <h3 className="book-title">{title}</h3>
//                   <p className="book-info">Author(s): {authors ? authors.join(', ') : 'N/A'}</p>
//                   <p className="book-info">Genre(s): {categories ? categories.join(', ') : 'N/A'}</p>
//                   <p className="book-info">Published Date: {publishedDate ? publishedDate : 'N/A'}</p>
//                 </div>
//                 <button className="button-btn" onClick={() => addToCart(book)}>
//                   Add to Cart
//                 </button>
//               </li>
//             );
//           }
//         })}
//         {currentPage < totalPages && <p>Loading more books...</p>}
//       </ul>
//     </div>
//   );
// };

// export default BookList;


