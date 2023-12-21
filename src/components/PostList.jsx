import React from 'react';
import moment from 'moment';
import TimerIcon from '../assets/icons/timer/iconmonstr-time-2.png';
import iconFav from '../assets/icons/favorite/iconmonstr-favorite-3.png';
import iconUnfav from '../assets/icons/favorite/iconmonstr-favorite-2.png';
import './../App.css';

const PostList = ({ posts, openTab, handleFav, favorites }) => {
    const isPostFavorite = (postId) => {
        const foundPost = posts.find((post) => post.objectID === postId);
        return foundPost && foundPost.isFav;
    };

    return (
        <div className='cards-container'>
          {posts.map((post, index) => (
            <li className={'card'} key={index}>
              <div className='bodyCard' onClick={() => openTab(post)}>
                <div className='date'>
                    <img src={TimerIcon} alt='timer'/>
                    <span> {moment(post.created_at).fromNow()} by {post.author}</span>
                </div>
                <div className='story_title'>{post.story_title}</div>
              </div>
              <div className='likeCard' onClick={() => handleFav(post.objectID)}>
                <img src={isPostFavorite(post.objectID) ? iconFav : iconUnfav} alt="No Favorite" />
              </div>
            </li>
          ))}
        </div>
      );
};

export default PostList;