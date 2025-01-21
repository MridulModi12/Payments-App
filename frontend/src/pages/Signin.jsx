import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_API_BACKEND_URL

  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label="Sign in" />
        <SubHeading label="Enter your credentials to access your account" />
        <InputBox onchange={e => setEmail(e.target.value)} label="Email" placeholder="johndoe@example.com" />
        <InputBox onchange={e => setPassword(e.target.value)} label="Password" placeholder="" />
        <div className="pt-4">
          <Button onClick={async() => {
              try {
                const response = await axios.post(`${backendUrl}/api/v1/user/signin`, {
                  username: email,
                  password
                })
                if(response.status === 200) {
                  localStorage.setItem("token", response.data.token)
                  navigate("/dashboard")
                }
              } catch(err) {
                console.error("Error with signin request: " + err)
                alert("Sign in failed. Please check your username/password")
              }
            }
          } label="Sign in"/>
        </div>
        <BottomWarning label="Don't have an account?" buttonText="Sign up" to="/signup" />
      </div>
    </div>
  </div>
}