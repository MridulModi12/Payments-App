import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export function Dashboard() {
  const token = localStorage.getItem("token")
  const userID = token ? jwtDecode(token).userId : null
  const [balance, setBalance] = useState()
  const [users, setUsers] = useState([])
  const backendUrl = import.meta.env.VITE_API_BACKEND_URL

  useEffect(() => {
    axios.get(`${backendUrl}/api/v1/account/balance`, {
      headers: {
        Authorization: "Bearer " + token
      }
    }).then(response => setBalance(response.data.balance))
      .catch(err => console.log("Error in get balance axios request: " + err))
  },[])


  useEffect(()=>{
    axios.get(`${backendUrl}/api/v1/user/bulk`)
      .then(response => setUsers(response.data.users))
      .catch(err => console.error("Error fetching users " + err))
  }, [])

  const user = users.find((user) => user._id == userID)
  const name = user ? user.firstName : ""

  return <div>
    <Appbar name={name} />
    <div className="m-8">
      <Balance value={balance} />
      <Users />
    </div>
  </div>
}