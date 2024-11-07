'use client'
 
import { useEffect, useState } from "react";

 
import UserCard from "../components/UserCard";
import socket from '@/lib/socket'
import { useUser } from "@/context/UserContext";
 
const Nav = () => {
  const [users, setUsers] = useState<User[]>([])
  const [onlineUsers, setOnlineUsers] = useState<User[]>([])
  const {setSelectedUser} = useUser()
 
 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8888/api/auth/users');
        if (!response.ok) {
          throw new Error('Erro ao buscar usuários');
        }
 
        const data = await response.json();
        setUsers(data.map((user: any) => ({ ...user, stats: 2 })));
 
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };
 
    fetchUsers();
 
    socket.on('users-online', (onlineUsers: User[]) => {
 
      setUsers(prevUsers =>
        prevUsers.map(user => ({
          ...user,
          stats: onlineUsers.some(onlineUser => onlineUser.id === user.id) ? 1 : 2
        }))
      );
    });
 
    return () => {
      socket.off('users-online');
    };
  }, []);
 
  return (
    <nav className="flex flex-col w-[250px] items-center justify-start items-end  h-screen p-4 bg-gray-800 text-white">
        <div className="flex flex-col w-[150px] pt-2 pb-4 ">
        <h2 className="text-lg font-bold text-white mb-4 text-justify">
        Usuários Online
        </h2>
        <ul className="flex flex-col w-full space-y-2">      
        {users.length <= 1 ? (<p className="text-gray-400">Nenhum usuário disponível</p>) :
        /* @ts-expect-error: */
        (users.filter((user) => user.name != socket?.auth?.user?.name).map((user, index) => (
          <button key={index} onClick={() => setSelectedUser(user)} aria-label={`Select user ${user.name}`} >
            <li className="flex-grow flex items-start justify-center w-full">
              <UserCard user={user}/>
            </li>
          </button>
        )))}
      </ul>
      </div>
      <a  className="px-4 py-2 w-full mt-auto justify-end text-center shadow-inner font-bold text-white max-w-32 bg-gray-400 hover:bg-gray-600 rounded-lg active:bg-gray-800" href="/login">
  
        Deslogar
          </a>
    </nav>
  );
};
 
export default Nav;