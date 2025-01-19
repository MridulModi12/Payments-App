import { jwtDecode } from "jwt-decode"

const token = localStorage.getItem("token")
export const userID = token ? jwtDecode(token).userId : null