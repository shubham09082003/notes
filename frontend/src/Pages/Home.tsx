
import NavBar from "../components/NavBar"
import NotesList from "../components/NotesList"
import MainArea from "../components/MainArea"

function Home() {

  return (
    <div className = "w-full h-full">

        <div className="w-7xl mx-auto">
            <NavBar/>
            <MainArea/>
            <NotesList/>
        </div>

    </div>
  )
}


export default Home;

