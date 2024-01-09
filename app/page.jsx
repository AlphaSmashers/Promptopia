// if we give a file name page.jsx, it will become default landing page. Here we will use this speciality to define our Home page, because we always want a user to land on Home page.
import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover & Share 
            <br className="max-md:hidden"/>
            <span className="orange_gradient text-center"> AI-Powered Prompts</span>
        </h1>
        <p className="desc text-center">Propmtopia is an open-source AI prompting tool for medern world to discover, create and share creative prompts.</p>
        <Feed />
    </section>
  )
}

export default Home