"use client"

import {useState, useEffect, useContext} from "react"
import PromptCard from "./PromptCard"
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
  const [posts, setPosts] = useState([])
  // const {posts, dispatch} = useContext(MyContext)
  //Avoid using context on client side apperently because deployed vercel app doesnt handle it. Exact Reason: Avoid client-side-only singletons: Refrain from using context providers that create singletons only accessible on the client-side.
  
  
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);


  
  useEffect(()=>{
    const fetchPosts = async ()=>{
      const response = await fetch("/api/prompt");
      const data = await response.json();
      console.log("Fetched data:", data);
      setPosts(data)
    }
    fetchPosts()
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
  
/*** 
Debouncing: 
  The setTimeout function is used to create a delay of 500 milliseconds (setTimeout(() => {...}, 500)). 
  This delay acts as a debounce, meaning that the filtering function (filterPrompts) is not immediately executed with every keystroke. 
  Instead, it waits for the user to stop typing for 500 milliseconds.

Clearing Previous Timeout: 
  The clearTimeout(searchTimeout) is used to clear any previously set timeouts. 
  This is crucial because if a user is typing quickly, you want to reset the timer each time they press a key. 
  If the timer isn't reset, the filtering function would be triggered too soon, and the results might not accurately reflect the final search term.

Here's an example to illustrate the importance of clearing the previous timeout:

  User starts typing: 'ca'
  Timeout is set for 500ms.
  User continues typing quickly: 'cat'
  Before the first timeout (500ms) is reached, another timeout is set for the new input (cat).
  The first timeout is cleared, and the second timeout is now the active one.
  User stops typing.
  After 500ms, the filtering function is called with the final input (cat).
  If you didn't clear the previous timeout, the filtering function might have been called with the intermediate input (ca), leading to inaccurate search results.

In summary, this code is a common pattern for optimizing search functionality by introducing a delay and ensuring that the filtering operation is triggered only after the user has paused typing for a short period. The clearing of the timeout is essential to handle scenarios where the user continues typing rapidly. 

*/

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