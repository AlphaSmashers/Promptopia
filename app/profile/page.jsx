//if its frontend path, its name would be page.jsx, unlike route.js when its a backend route
"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

// it is a client side page, so we wont be using data directly here.
import Profile from "@components/Profile"

const MyProfile = () => {
    const {data: session} = useSession()
    // means destructure the data, rename it to session.
    const router = useRouter()

    const [posts, setPosts] = useState([])

    const handleEdit = (post)=>{
        router.push(`/update-prompt?id=${post._id}`)
    }
    
    const handleDelete = async(post)=>{
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "delete"
                })
                const filteredPosts = posts.filter((p)=> p._id !== post._id)
                setPosts(filteredPosts)
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(()=>{
        const fetchPosts = async()=>{
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }
        if (session?.user.id) {
            fetchPosts()
        }
    }, []) 

  return (
    <Profile 
        name="My"
        desc="Welcome to your personilized Profile page."
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}

    />
  )
}

export default MyProfile