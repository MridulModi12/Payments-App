import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios"
import { userID } from "../token"
import { useNavigate } from "react-router-dom"

export function Users() {
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then(response => setUsers(response.data.users))
      .catch(err => console.error("Error fetching users " + err))
  }, [filter])

  return <>
    <div className="font-bold mt-6 text-lg">
        Users
    </div>
    <div className="my-2">
        <input onChange={e => setFilter(e.target.value)} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
    </div>
    <div>
        {users.map((user) => {
            if(!(user._id === userID))
              return <User key={user._id} user={user} />
          })}
    </div>
  </>

  function User({user}) {
    const navigate = useNavigate()

    return <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName[0].toUpperCase() + user.firstName.slice(1)} {" "}
            {user.lastName[0].toUpperCase() + user.lastName.slice(1)}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="mt-2">
          <Button onClick={() => 
            navigate("/send?id=" + user._id + "&name=" + user.firstName)
          } label="Send Money" />
        </div>
      </div>
    </div>
  }
}