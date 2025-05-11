import { useContext, createContext, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("email") || null);
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
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const res = await response.json();
      if (res) {
        setUser(obj.email);
        setTokens(res);
        localStorage.setItem("email", obj.email);
        localStorage.setItem("tokens", JSON.stringify(res));

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
    localStorage.removeItem("email");
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

  const checkingImageURL = (text) => {
    const regex = /^https?:\/\/.*\.(jpeg|jpg|png|gif)$/i;
    return regex.test(text);
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
        checkingImageURL,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
