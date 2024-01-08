// Here we are using browser's camability, so we hace to use the 'use client' on top.
"use client"

import { SessionProvider } from "next-auth/react"

const Provider = ({children, session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider