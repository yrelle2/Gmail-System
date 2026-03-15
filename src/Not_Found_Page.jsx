import {Link} from 'react-router-dom';

const Not_Found_Page = () =>{
    return(
        <div>
            <h1>Not Found Page ❌ </h1>
            <Link to={"/"}>
                <button>Go back Home</button>
            </Link>
        </div>
    )
}

export default Not_Found_Page;