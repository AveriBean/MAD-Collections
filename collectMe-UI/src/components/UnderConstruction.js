import {useEffect} from "react"

function UnderConstruction() {

    useEffect(() => {
        document.body.className="bgUnderConstruction"
        return () => document.body.className=""
    },[])

    return (
      <main>
        <div className="bgUnderConstruction">
            <div className= "textUnderConstruction">
                <h2 className=" py-4" variant="light">🚧Page Under Construction🚧</h2>
                <p>Please come back later!</p>
            </div>
        </div>
      </main>
    );
  }
  
  export default UnderConstruction;