import React from 'react'
import styled from 'styled-components'

const Photo = ({
    urls:{regular}, 
    alt_description, 
    likes, 
    user:{
        name, 
        portfolio_url, 
        profile_image: {medium}
        }
    }) => {
    return (
        <Article>
            <img src={regular} alt={alt_description}/>
            <div className="photo-info">
                <div>
                <h4>{name}</h4>
                <p>{likes} likes</p>
                </div>
                <a href={portfolio_url}>
                    <img src={medium} alt={name} className="user-img" />
                </a>
            </div>
        </Article>
    )
}

const Article = styled.div`
width: 100%;
height: 300px;
position: relative;

 img{
     width: 100%;
     height: 100%;
     object-fit: cover;

 }

 .photo-info{
     display: flex;
     justify-content: space-between;
     align-items: center;
     cursor: pointer;

     width: 100%;
     padding: 0 15px;
     box-sizing: border-box;
     position: absolute;
     bottom: 0px;
     left: 0;
     background-color: rgba(0,0,0,0.5);
     color: #ffffff;
     transition: all 0.5s ease;

     img{
         width: 50px;
         height: 50px;
         border-radius: 50%;
     }

 }

`;
export default Photo
