import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userData")) || ""
  );

  const [cart, setCart] = useState([]);
  const [loginError, setLoginError] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);

  const loginAction = async (obj) => {
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...obj,
            email: obj.email.toLowerCase(),
          }),
        }
      );
      if (!response.ok) {
        console.log(
          `Error ${response.status} Login failed: ${response.statusText}`
        );
        return setLoginError(
          `Error ${response.status} Login failed => ${response.statusText}`
        );
      }
      const res = await response.json();
      if (res) {
        localStorage.setItem("tokens", JSON.stringify(res));
        fetchUserData(res.access_token);
        // setTokens(res);
        setLoginError(null);
        return;
      }
    } catch (err) {
      console.error(err);
      refreshTokenFunction(
        JSON.parse(localStorage.getItem("tokens")).refresh_token
      );
    }
  };

  const refreshTokenFunction = (refreshToken) => {
    if (!refreshToken) {
      console.log("No refresh token available. Please log in again.");
      // Optionally, force re-login here
      window.location.reload();
      return;
    }

    fetch("https://api.escuelajs.co/api/v1/auth/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(refreshToken),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Token refresh failed");
        }
        const data = await response.json();
        localStorage.setItem("token", JSON.stringify(data));
        // Optionally update refresh_token if returned
      })
      .catch((error) => {
        console.error("Refresh token error:", error);
      });
  };

  const fetchUserData = useCallback((accessToken) => {
    fetch("https://api.escuelajs.co/api/v1/auth/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(async (response) => {
        if (response.status === 401) {
          //Token expired or invalid, try to refresh
          await refreshTokenFunction(
            JSON.parse(localStorage.getItem("tokens")).refresh_token
          );
        } else if (!response.ok) {
          throw new Error("Error fetching data");
        } else {
          const data = await response.json();
          setUser(data);
          // localStorage.setItem("userData", JSON.stringify(data));
        }
      })
      .catch((error) => {
        console.error("Fetch error", error);
      });
  }, []);

  // get access_token from local storage
  useEffect(() => {
    if (localStorage.getItem("tokens")) {
      fetchUserData(JSON.parse(localStorage.getItem("tokens")).access_token);
    }
  }, [fetchUserData]);

  // fetching categories and store it
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/categories"
        );
        if (!response.ok) {
          throw new Error("Error Fetching Categories");
        }
        const data = await response.json();
        setCategoriesList(data);
      } catch (err) {
        console.log("Error Fetching categories", err.message);
      }
    };
    fetchCategories();
  }, []);

  //logout user
  const logOut = () => {
    setUser(null);
    localStorage.removeItem("tokens");
    localStorage.removeItem("userData");
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
        user,
        loginAction,
        logOut,
        cart,
        updateCart,
        removeItemsFromCart,
        resetCart,
        checkingImageURL,
        loginError,
        setLoginError,
        categoriesList,
        setCategoriesList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
