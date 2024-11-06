"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const Page = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { register, error } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(name, username, password, passwordConfirmation);
  };

  return (
    <main className="w-full h-full display flex justify-stretch items-center bg-mint-700 bg-gradient-to-r from-emerald-500 via-emerald-300 to-emerald-500">
      <div className="w-[400px] shadow-xl flex flex-col max-w-md p-6 mx-auto text-center text-black bg-gradient-to-l from from-gray-200 via-gray-300 to-gray-200 rounded-lg shadow">
        <h1 className="mb-4 text-lg font-bold text-gray-600 text-center text-2xl font-bold">
          Página de Registro
        </h1>
        <form className="flex flex-col items-center gap-4" onSubmit={handleRegister}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 text-black bg-white border border-gray-300 outline-none rounded-lg"
            type="text"
            placeholder="Digite seu nome"
            required
          />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 text-black bg-white border border-gray-300 outline-none rounded-lg"
            type="email"
            placeholder="Digite seu email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 text-black bg-white border border-gray-300 outline-none rounded-lg"
            type="password"
            placeholder="Digite sua senha"
            required
          />
          <input
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full p-2 text-black bg-white border border-gray-300 outline-none rounded-lg"
            type="password"
            placeholder="Confirme sua senha"
            required
          />
          <button
            className="px-4 py-2 w-full shadow-inner font-bold text-white bg-sky-400 max-w-32 bg-emerald-400 hover:bg-emerald-600 rounded-lg active:bg-emerald-800"
            type="submit"
          >
            Registrar
          </button>
          <p className="text-bold text-gray-600">Já tem possui conta?</p>
            <a className="text-blue-600 hover:underline" href="/login">
              Clique aqui
            </a>
          
          {error && <p className="text-red-600">{error.message}</p>}
        </form>
      </div>
    </main>
  );
};

export default Page;
