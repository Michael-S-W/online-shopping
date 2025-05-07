import { useContext, createContext, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(localStorage.getItem("tokens") || "");
  const [cart, setCart] = useState([]);
  const loginAction = async (obj) => {
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );
      const res = await response.json();
      if (res) {
        setUser(obj.email);
        setTokens(res);
        localStorage.setItem("tokens", res);
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setTokens("");
    localStorage.removeItem("tokens");
    // navigate("/home");
  };

  const updateCart = (obj) => {
    setCart([...cart, obj]);
  };

  const resetCart = (arr) => {
    setCart(arr);
  };

  const removeItemsFromCart = (obj) => {
    setCart(obj);
  };
  return (
    <AuthContext.Provider
      value={{
        tokens,
        user,
        loginAction,
        logOut,
        cart,
        updateCart,
        removeItemsFromCart,
        resetCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
