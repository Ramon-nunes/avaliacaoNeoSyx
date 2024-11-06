"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <main className="w-full h-full display flex justify-stretch items-center bg-mint-700 bg-image bg-gradient-to-r from-cyan-700 via-cyan-500 to-cyan-700">
      <div className="w-[400px] shadow-xl flex flex-col max-w-md p-6 mx-auto text-center text-black bg-gradient-to-l from from-gray-200 via-gray-300 to-gray-200 rounded-lg shadow">
        <h1 className="mb-4 text-lg font-bold text-gray-600 text-center text-2xl font-bold">
          Página de Login
        </h1>
        <form
          className="flex flex-col items-center gap-4"
          onSubmit={handleLogin}
        >
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 text-black bg-white border border-gray-300 outline-none rounded-lg"
            type="text"
            placeholder="Digite seu email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 text-black bg-white border border-gray-300 outline-none rounded-lg"
            type="password"
            placeholder="Digite sua senha"
          />
          <button
            className="px-4 py-2 w-full shadow-inner font-bold text-white bg-sky-400 max-w-32 bg-sky-400 hover:bg-sky-600 rounded-lg active:bg-sky-800"
            type="submit"
          >
            Login
          </button>
          <p className=" text-bold text-gray-600">Não tem uma conta?</p>
            <a className="text-blue-600 hover:underline" href="/register">
            Clique aqui
            </a>
          <p className="text-red-600">{error?.message}</p>
        </form>
      </div>
    </main>
  );
};

export default Page;
