import {Link} from "react-router"

export default function NotFoundPage() {
  return (
    <div>
      <h1>Sorry! Cannot locate page</h1>
      <p>Please return <Link to="/">Home</Link></p>    
    </div>

  )
}