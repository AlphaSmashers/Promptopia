"use client"

import {useState, useEffect} from "react"
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

  const [searchText, setSearchText] = useState("")
  const [posts, setPosts] = useState([])
  const [originalPosts, setOriginalPosts] = useState([])

  useEffect(()=>{
    const fetchPosts = async()=>{
      const response = await fetch("/api/prompt");
      const data = await response.json()
      setPosts(data)
      setOriginalPosts(data)
    }
    fetchPosts()
  }, []) 

  const handleSearchChange = (e)=>{
    e.preventDefault()
    
  }

  const tagPosts = async(tag)=>{
    try {
      if (tag) { 
        const response = await fetch(`/api/prompt/tag/${tag.toString()}`)
        const data = await response.json()
        setPosts(data)
        /* Alternatively, 
        const filteredPosts = posts.filter((p)=> p._id !== post._id)
        setPosts(filteredPosts) */
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleLogoClick = ()=>{
    setPosts(originalPosts);
  }

  
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
      <PromptCardList data={posts} handleTagClick={tagPosts} />
    </section>
  )
}

export default Feed