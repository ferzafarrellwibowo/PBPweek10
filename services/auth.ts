import { getItem, removeItem, setItem } from "../storage/async";

interface User {
  email: string;
}

const DUMMY_USERS: User[] = [
  { email: "admin@example.com" },
  { email: "user@example.com" },
];

export const login = async (email: string, password: string) => {
  const user = DUMMY_USERS.find(u => u.email === email);

  if (!user) throw new Error("Email tidak terdaftar");
  // Password dicek disini jika mau, sekarang dummy jadi selalu berhasil

  await setItem("user", user);
  return user;
};

export const logout = async () => {
  await removeItem("user");
};

export const getCurrentUser = async () => {
  return await getItem("user");
};
