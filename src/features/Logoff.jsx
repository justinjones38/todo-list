import { useAuth } from "../contexts/AuthContext";
export default function Logoff() {
  const { logout } = useAuth();
  const handleSubmit = async () => {
    try {
      const result = await logout();
      if (!result.success) {
        throw new Error(result.error);
      }
    } catch (error) {
      return error.message;
    }
  };
  return <button onClick={logout}>Log off</button>;
}
