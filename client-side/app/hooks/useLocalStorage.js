// hooks/useLocalStorage.js
import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return window.localStorage.getItem(key) || initialValue;
      } catch (error) {
        console.error("Error reading localStorage", error);
        return initialValue;
      }
    }
    return initialValue;
  });

  const setValue = (value) => {
    if (typeof window !== "undefined") {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, valueToStore); // No JSON.stringify
      } catch (error) {
        console.error("Error writing to localStorage", error);
      }
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
