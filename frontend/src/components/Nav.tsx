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
    <nav className="h-screen p-4 bg-gray-800 shadow-lg flex flex-col items-start">
      <h2 className="text-lg font-bold text-white mb-4">Usuários Online</h2>
        <ul className="flex flex-col w-full space-y-2">      
        {users.length <= 1 ? (<p className="text-gray-400">Nenhum usuário disponível</p>) :
        /* @ts-expect-error: */
        (users.filter((user) => user.name != socket?.auth?.user?.name).map((user, index) => (
          <button key={index} onClick={() => setSelectedUser(user)} aria-label={`Select user ${user.name}`} >
            <li >
              <UserCard user={user}/>
            </li>
          </button>
        )))}
      </ul>
    </nav>
  );
};
 
export default Nav;