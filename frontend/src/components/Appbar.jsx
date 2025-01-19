import { useNavigate } from "react-router-dom";

export function Appbar({name}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">PayTM App</div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">{name.toUpperCase()[0]}</div>
        </div>
        <button
          onClick={handleLogout}
          className="h-4/6 px-4 flex items-center bg-blue-500 text-white rounded-md ml-2 mt-2 mr-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
}