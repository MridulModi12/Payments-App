import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_API_BACKEND_URL

  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label="Sign up" />
        <SubHeading label="Enter your information to create an account" />
        <InputBox onchange={e=>setFirstName(e.target.value)} label="First Name" placeholder="John" />
        <InputBox onchange={e=>setLastName(e.target.value)} label="Last Name" placeholder="Doe" />
        <InputBox onchange={e=>setUsername(e.target.value)} label="Email" placeholder="johndoe@example.com" />
        <InputBox onchange={e=>setPassword(e.target.value)} label="Password" placeholder="" />
        {error && <div className="text-red-500">{error}</div>}
        <div className="pt-4">
          <Button onClick={async()=> {
            try {
              const response = await axios.post(`${backendUrl}/api/v1/user/signup`, {
                username,
                firstName,
                lastName,
                password
              })
              localStorage.setItem("token", response.data.token)
              navigate("/dashboard")
            } catch(err) {
              setError(err.response.data.message || "Sign up failed. Please try again.")
            }
          }} label="Sign up"/>
        </div>
        <BottomWarning label="Already have an account?" buttonText="Sign in" to="/signin" />
      </div>
    </div>
  </div>
}