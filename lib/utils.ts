import { clsx, type ClassValue } from "clsx";
import { FormEvent } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};
export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};
export const removeToken = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
};
export const submitHandler = async (
  e: FormEvent,
  userData: any,
  setUserData: any,
  router: any,
  url: string,
) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    e.preventDefault();
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    if (res.ok) {
      toast.success(result.message, {
        duration: 1000,
        onAutoClose: () => router.push("/todo"),
      });
      setUserData({
        email: "",
        password: "",
      });
      saveToken(result.token);
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};
export const getTodos = async () => {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const token = getToken();
    const res = await fetch(`${BASE_URL}/todo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    if (res.ok) {
      return result.todos;
    } else {
      toast.error(result.message);
      return [];
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
    return [];
  }
};
export const addTodo = async (task: {
  title: string;
  description: string;
  isCompleted: boolean;
}) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const token = getToken();
  try {
    const res = await fetch(`${BASE_URL}/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    const result = await res.json();
    if (res.ok) {
      toast.success(result.message, {
        duration: 1000,
      });
      return result;
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};
export const deleteTodo = async (todoId: string) => {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const token = getToken();
    const res = await fetch(`${BASE_URL}/todo/${todoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    if (res.ok) {
      return result;
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
    return;
  }
};
export const editTodo = async (
  todoId: string,
  task: {
    title: string;
    description: string;
    isCompleted: boolean;
  },
) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const token = getToken();
  try {
    const res = await fetch(`${BASE_URL}/todo/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    const result = await res.json();
    if (res.ok) {
      toast.success(result.message, {
        duration: 1000,
      });
      return result;
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};
export const getProfile = async () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const token = getToken();
  try {
    const res = await fetch(`${BASE_URL}/userProfile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    if (res.ok) {
      return result.user;
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};
export const getAllUsers = async () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const token = getToken();
  try {
    const res = await fetch(`${BASE_URL}/admin/allUsers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    if (res.ok) {
      return result.users;
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};
export const getAllTodos = async () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const token = getToken();
  try {
    const res = await fetch(`${BASE_URL}/admin/allTodos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    if (res.ok) {
      return result.todos;
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};
export const removeAllTodos = async () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const token = getToken();
  try {
    const res = await fetch(`${BASE_URL}/admin/todos`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    if (res.ok) {
      toast.success(result.message, {
        duration: 1000,
      });
      return result;
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};
export const removeUser = async (userId: string) => {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const token = getToken();
    const res = await fetch(`${BASE_URL}/admin/user/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    if (res.ok) {
      toast.success(result.message, {
        duration: 1000,
      });
      return result;
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};
export const makeRoleAdmin = async (userId: string) => {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const token = getToken();
    const res = await fetch(`${BASE_URL}/admin/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    if (res.ok) {
      toast.success(result.message, {
        duration: 1000,
      });
      return result;
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};
