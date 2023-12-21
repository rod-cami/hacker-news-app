import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../App.css';
import { useLocation } from 'react-router-dom';
import PostList from './PostList';
import Combo from './Combo';


const MainComponent = ({activeTab}) => {
  const [posts, setPosts] = useState([]);
  const[currentPage, setCurrentPage] = useState(1);
  const[totalPages, setTotalPages] = useState(0);
  const postsPerPage = 8;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const technology = searchParams.get('query');
  const query = technology || 'reactjs';
  const [favorites, setFavorites] = useState([]);
  const [originalPosts, setOriginalPosts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=${currentPage - 1}`);
        const fetchedPosts = response.data.hits.filter(post => post.author && post.story_title && post.story_url && post.created_at);
        setPosts(fetchedPosts);
        setOriginalPosts(fetchedPosts);
        setTotalPages(response.data.nbPages);
      }catch (error) {
        console.error('Error fetching data: ',error);
      }
    };
    fetchData();
  },[currentPage,query])

  useEffect(() => {
    if (activeTab === 'My Favs') {
      const favPosts = originalPosts.filter(post => post.isFav);
      setFavorites(favPosts);
    }
  }, [activeTab, originalPosts]);
 

  const openTab = (post) => {
    window.open(post.story_url,'_blank');
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  const handleFav = (postId) => {
    const updatedPosts = originalPosts.map(post =>
      post.objectID === postId ? {...post, isFav: !post.isFav} : post);
      setOriginalPosts(updatedPosts);
      setPosts(updatedPosts);
  }

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = activeTab === 'My Favs' ? favorites.slice(startIndex, endIndex) : posts.slice(startIndex, endIndex);


  const [sindex, setSindex] = useState(-1);

  const selectedIndex = (index) => {
    setSindex(index);
  };

  const showIndex = () => {
    alert("Selected index: " + sindex)
  }


  return (
    <div>
      <Combo text='Select an option' itemSelectedEvent={selectedIndex} startIndex="0"/>
      <main className="main-container">
        <PostList
         posts={currentPosts}
         openTab={openTab}
         handleFav={handleFav}
         favorites={activeTab === 'My Favs' ? favorites : []}/>
      </main>
    </div>
  );
};

export default MainComponent;
