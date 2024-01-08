"use client" /* Because we are using client based functionality like React Hooks-> useState and useEffect */

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import Provider from "./Provider"

const Nav = () => {
  const {data: session} = useSession()
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const handleClickOutside = (event) => {
    if (toggleDropdown && !event.target.closest('.dropdown')) {
      setToggleDropdown(false);
    }
  };
  
  const [providers, setProviders] = useState(null)
  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setProviders()
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleDropdown]);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" width={30} height={30} className="object-contain" alt="Promptopia Logo" />
        <p className="logo_text">Promptopia</p>
      </Link>


      {/* Desktop Navigation */}
      <div className="sm:flex hidden"> {/* When the screen size reaches the 'medium' breakpoint and going above, the sm:flex class takes effect again, because the 'small' breakpoint no longer applies. This makes the div visible on medium screens and larger. */}
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">Create Post</Link>
            <button onClick={signOut} className="outline_btn">Sign Out</button>

            <Link href="/profile">
              <Image src="/assets/images/logo.svg" width={37} height={37} className="rounded-full" alt="Profile" />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                  Sign In
                </button>
              ))
            }
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? ( 
          <Image src="/assets/images/logo.svg" onClick={() => setToggleDropdown((prev) => !prev)} width={37} height={37} className="rounded-full" alt="Profile" />
        ): (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                  Sign In
                </button>
              ))
            }
          </>
        )}

        { toggleDropdown && (
          <div className="dropdown">
            <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>My Profile</Link>
            <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}>Create Prompt</Link>
            <button type="button" onClick={()=>{
              setToggleDropdown(false);
              signOut();
            }} className="mt-5 w-full black_btn">Sign Out</button>
          </div>)
        }
      </div>
    
    </nav>
  )
}

export default Nav