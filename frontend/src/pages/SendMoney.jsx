import axios from "axios"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

export function SendMoney() {
  const [searchParams] = useSearchParams()
  const to = searchParams.get("id")
  const name = searchParams.get("name")
  const [amount, setAmount] = useState(0)
  const navigate = useNavigate()

  return <div className="flex justify-center h-screen bg-gray-100">
    <div className="h-full flex flex-col justify-center">
      <div className="border h-min max-w-md p-4 w-96 bg-white shadow-lg rounded-lg">
        <div className="p-6 pb-12">
          <h2 className="text-3xl font-bold text-center text-green-500">Send Money</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
            </div>
            <h3 className="text-2xl font-semibold">{name[0].toUpperCase() + name.slice(1)}</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium leading-none">
                Amount (in Rs)
              </label>
              <input
                onChange={e => setAmount(Number(e.target.value))}
                type="number"
                placeholder="Enter amount"
                className="h-10 w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>
            <button onClick={() => {
              axios.post("http://localhost:3000/api/v1/account/transfer", {
                to,
                amount
              }, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token")
                }
              })
            }} className="rounded-md text-sm font-medium h-10 px-4 py-2 w-full bg-green-500 text-white">
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
}