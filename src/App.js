import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {Search} from '@material-ui/icons';
import Photo from './Photo'

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const fetchImg = async() =>{
    setLoading(true)
    let url; 
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;

    if(query){
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
    }
    else{
      //초기 data 값만 가져오는 것 
      url = `${mainUrl}${clientID}${urlPage}`
    }

    try{
      const response = await fetch(url);
      const data = await response.json()
      console.log(data)
      setPhotos((oldPhotos) => {
        if(query && page === 1){
          return data.results
        }else if(query){
          return [...oldPhotos, ...data.results]
        }else{
          return [...oldPhotos, ...data]
        }
      })
      setLoading(false)
     }catch(error){
       setLoading(false)
     }
  }
  
  useEffect(() => {
    fetchImg()
  },[page])


  useEffect(() =>{
    const event = window.addEventListener('scroll', () => {
      if(!loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2){
        setPage( (oldPage) => {
          return oldPage + 1
        })
      }
    });
    return () => window.removeEventListener('scroll', event)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!query) return;
    if(page === 1){
      fetchImg();
    }
    setPage(1)
  }

  return (
    <Main>
      <SearchForm>
        <form className="search-form">
          <input type="text" placeholder="search" className="form-input" value={query} onChange={(e) => setQuery(e.target.value)} />
          <button type="submit" className="submit-btn" onClick={handleSubmit}><Search className="icon" /></button>
        </form>
      </SearchForm>
      <PhotoForm>
        <div className="photo-center">
          {photos.map((image, index) => {
            return <Photo key={index} {...image} />
          })}
        </div>
        {loading && <h2 className='loadidng'>Loading...</h2>}
      </PhotoForm>
    </Main>
  );
}

const Main = styled.div`
width:1280px;
margin : 0px auto;
padding-top: 50px;


@media only screen and (max-width: 768px) {
  width: 100%;
}

`;

const SearchForm = styled.section`
width: 400px;

.search-form
  input{
    width: 300px;
    border: 0;
    outline: 0;
    border-bottom : 3px solid navy;
    padding: 10px 10px;

    ::placeholder{
      font-size: 22px;
    }
  }

  button{
    border: 0;
    outline: 0;
    background-color: transparent;
    color: navy;
    box-sizing: border-box;
    cursor: pointer;

    .icon{
      font-size: 28px;
    }
  }

`;


const PhotoForm = styled.div`
padding-top: 50px;

.photo-center{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;


  @media only screen and (max-width: 768px) {
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  }


}

`;

export default App;
