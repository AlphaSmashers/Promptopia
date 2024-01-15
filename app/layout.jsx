import "@styles/globals.css"
import Nav from "@components/Nav"
import Provider from "@components/Provider"
// import { MyProvider } from "@context/MyContext"

export const metadata = {
    title: "Promptopia",
    description: "Discover & Share AI Prompts"
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <body>
            <Provider>
                {/* <MyProvider> */}
                    <div className="main">
                        <div className="gradient" />
                    </div>

                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                {/* </MyProvider> */}
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout