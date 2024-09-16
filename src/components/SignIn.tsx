import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';

type SignInProps = {
  setUsername: Dispatch<SetStateAction<string | undefined>>;
};

type LoginFormState = {
  username: string;
  password: string;
};

export default function SignIn({ setUsername }: SignInProps) {
  const USERNAME = 'Natalia';
  const PASSWORD = 'demo123';
  const { handleModal } = useContext(ModalContext);
  const [loginError, setLoginError] = useState<string>();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormState>({
    username: USERNAME,
    password: PASSWORD,
  });

  function onLoginClick(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (formData.username === USERNAME && formData.password === PASSWORD) {
      setUsername(formData.username);
      handleModal(null, false);
    } else {
      setLoginError('Incorrect username or password.');
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }

  function togglePasswordVisibility(): void {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <div className="p-2">
      <div className="flex flex-row justify-between">
        <p className="mb-3 text-sm font-bold">Login</p>

        <XMarkIcon
          onClick={() => handleModal(null, false)}
          className="w-5 text-gray-600 cursor-pointer hover:text-black"
        />
      </div>

      <div className="flex justify-center text-red-600">{loginError}</div>

      <form method="post" onSubmit={onLoginClick}>
        <label className="font-medium" htmlFor="username">
          Username<span className="text-red-600">*</span>
        </label>

        <input
          className="w-full p-3 my-2 border border-gray-300 rounded-3xl focus:outline-none"
          type="text"
          name="username"
          placeholder="Username"
          defaultValue={USERNAME}
          onChange={handleChange}
        />

        <label className="font-medium" htmlFor="password">
          Password<span className="text-red-600">*</span>
        </label>

        <div className="flex w-full p-3 my-2 border border-gray-300 rounded-3xl">
          <input
            className="flex-grow focus:outline-none"
            type={isPasswordVisible ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            defaultValue={PASSWORD}
            onChange={handleChange}
          />

          <button type="button" onClick={togglePasswordVisibility}>
            {isPasswordVisible ? (
              <EyeSlashIcon className="h-4 text-gray-600 hover:text-black" />
            ) : (
              <EyeIcon className="h-4 text-gray-600 hover:text-black" />
            )}
          </button>
        </div>

        <div className="flex mb-2 text-red-600">
          <ExclamationCircleIcon className="w-4 mx-1" />
          For demo purposes use {USERNAME}/{PASSWORD}
        </div>

        <button
          type="submit"
          className="w-full p-3 my-2 font-bold text-white border rounded-3xl bg-amber-400 hover:shadow-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
}
