"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Form from "@components/Form"

const CreatePrompt = () => {
    const router = useRouter()
    const {data: session} = useSession()
    
    const [submitting, setIsSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: "",
        tag:"",
    })

    const createPrompt = async(e)=>{
        e.preventDefault()
        setIsSubmitting(true)
        try{
            const response = await fetch("/api/prompt/new", {
                method: "post",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id, /* this ?, means we are checking is we do have the session.!?*/
                    tag: post.tag
                }) //standard procedure to send data in JSON formet, as data is often transmitted or stored in the form of strings.
            })

            if (response.ok) {
                router.push("/")
            }

        } catch(error) {
            console.log(error);
        } finally {
            setIsSubmitting(false)
        }
    }
  return (

        <Form 
            type = "Create"
            post = {post}
            setPost = {setPost}
            submitting = {submitting}
            handleSubmit = {createPrompt}
        />
  )
}

export default CreatePrompt