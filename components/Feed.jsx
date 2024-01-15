"use client"

import {useState, useEffect, useContext} from "react"
import PromptCard from "./PromptCard"
import MyContext from "@context/MyContext"
import { fetchPosts } from "@context/MyActions"
// import Prompt from "@models/prompt" 
//** You should never import this on client side module, because its not safe and it will create error.

const PromptCardList = ({data, handleTagClick})=>{
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post)=>(
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  // const [posts, setPosts] = useState([])
  const {posts, dispatch} = useContext(MyContext)
  
  
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);


  const getData = async ()=>{
    const data = await fetchPosts()
    /***** The moment you get the data[await], dispatch it to set the state. As it is a part of async function, the time to actualy fullfill the promise might vary, so if we use this dispatch function outside, it will run parallely of fetching the result and not sequencially, hence it wont have right data to actually set the value of state.   */
    dispatch({type: "SET_POSTS", payload: data })
    /* dispatch({ type: "SET_ORG_POSTS", payload: data }); //the above dispatch could also take some time, so dont use the posts state that you just commanded/dispatched to be updated. Insted use the data which the SET_POSTS is also using */
  }

  useEffect(()=>{
    getData()
  }, []) 

  const filterPrompts = (search_text) => {
    const regex = new RegExp(search_text, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const search_Result = filterPrompts(e.target.value);
        setSearchedResults(search_Result);
      }, 500)
    );
  };



 /** const handleTagClick = async(tag)=>{
    try {
      if (tag) { 
        const response = await fetch(`/api/prompt/tag/${tag.toString()}`)
        const data = await response.json()
        dispatch({type: "SET_POSTS", payload: data })
      }
    } catch (error) {
      console.log(error);
    }
  } */
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };


  
  return (
    <section className="feed">
      <form action="relative w-full flex-center">
        <input type="text" 
        placeholder="Search for a tag or a username"
        value={searchText}
        onChange={handleSearchChange}
        required 
        className="search_input peer"
        />
      </form>
      {searchText? (
        <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
      ):(
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed