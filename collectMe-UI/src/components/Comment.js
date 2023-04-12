import React, { useContext } from 'react';
import AuthContext from "../contexts/AuthContext";

function Comment() {

    const { user } = useContext(AuthContext);

    // var [date,setDate] = useState(new Date());

    // useEffect(() => {
    //     var timer = setInterval(()=>setDate(new Date()), 1000 )
    //         return function cleanup() {
    //              clearInterval(timer) 
    //         }
    // });

        return( 
        <>
        <div className='text-center'>
           <h2> Comment </h2>
           <form>
                <div className="mb-3 d-none">
            <label htmlFor="username" className="form-label"> Username </label>
            <input type="text" name="username" id="username" className="form-control border-dark-subtle" required/>
                </div>
                <div>
                <textarea name="content" id="content"></textarea>
                </div>
            <div className="mb-3">
                <button type="submit" className="btn dark-pop m-0 me-1">
                Save
                </button>
                <button className="btn yellow-pop m-0">
                Cancel
                </button>
          </div>
           </form>
        </div>
    {/* <div className='text-center'><p> 
            Time: {date.toLocaleTimeString()}</p><p> 
            Date: {date.toLocaleDateString()}</p>
        </div>  */}
        </>
    )
}

export default Comment;
