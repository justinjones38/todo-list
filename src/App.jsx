import Header from "./shared/Header";
import Logon from "./features/Logon";
import TodosPage from "./features/Todos/TodosPage";
import "./App.css";
import { useState } from "react";
import { useAuth } from "./contexts/AuthContext";

export default function App() {
  const {isAuthenticated} = useAuth()

  return (
    <>
      <Header />
      {isAuthenticated ? (
        <TodosPage />
      ) : (
        <Logon />
      )}
    </>
  );
}
