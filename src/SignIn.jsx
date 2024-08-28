import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { ModalContext } from "./context/ModalContext";

export default function SignIn({ setUsername }) {
  const USERNAME = 'Natalia';
  const PASSWORD = 'demo123';
  const { handleModal } = useContext(ModalContext);
  const [loginError, setLoginError] = useState();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function onLoginClick(e) {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    if (username === USERNAME && password === PASSWORD) {
      setUsername(username);
      handleModal(false);
    } else {
      setLoginError('Incorrect username or password.');
    }
  }

  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <div className="p-2">
      <div className="flex flex-row justify-between">
        <p className="mb-3 text-sm font-bold">Login</p>

        <XMarkIcon
          onClick={() => handleModal(false)}
          className="w-5 text-gray-600 cursor-pointer hover:text-black"
        />
      </div>

      <div className="flex justify-center text-red-600">
        {loginError}
      </div>

      <form method="post" onSubmit={onLoginClick}>
        <label className="font-medium" name="username">Username<span className="text-red-600">*</span></label>

        <input className="w-full p-3 my-2 border border-gray-300 rounded-3xl focus:outline-none" type="text" placeholder="Username" defaultValue={USERNAME} />

        <label className="font-medium" name="password">Password<span className="text-red-600">*</span></label>

        <div type="button" className="flex w-full p-3 my-2 border border-gray-300 rounded-3xl">
          <input className="flex-grow focus:outline-none" type={isPasswordVisible ? "text" : "password"} placeholder="Password" defaultValue={PASSWORD} />

          <button type="button" onClick={togglePasswordVisibility}>
            {isPasswordVisible
              ? <EyeSlashIcon className="h-4 text-gray-600 hover:text-black" />
              : <EyeIcon className="h-4 text-gray-600 hover:text-black" />
            }
          </button>
        </div>

        <div className="flex mb-2 text-red-600"><ExclamationCircleIcon className="w-4 mx-1" />For demo purposes use {USERNAME}/{PASSWORD}</div>

        <button
          type="submit"
          className="w-full p-3 my-2 font-bold text-white border rounded-3xl bg-amber-400 hover:shadow-lg"
        >
          Login
        </button>
      </form>
    </div>
  )
}
