import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue, rememberMe = true) {
  const isClient = typeof window !== "undefined";

  const getStorage = (remember) =>
    remember ? window.localStorage : window.sessionStorage;

  const [storedValue, setStoredValue] = useState(() => {
    if (!isClient) return initialValue;
    try {
      const storage = getStorage(rememberMe);
      const stored = storage.getItem(key);
      return stored ? stored : initialValue;
    } catch (error) {
      console.error("Error reading storage", error);
      return initialValue;
    }
  });

  const setValue = (value, remember = rememberMe) => {
    if (!isClient) return;
    try {
      const storage = getStorage(remember);
      const valueToStore =
        typeof value === "function" ? value(storedValue) : value;

      setStoredValue(valueToStore);
      if (valueToStore !== null) {
        storage.setItem(key, valueToStore);
      } else {
        storage.removeItem(key);
      }
    } catch (error) {
      console.error("Error writing to storage", error);
    }
  };

  const clearValue = () => {
    if (!isClient) return;
    try {
      const storage = getStorage(rememberMe);
      storage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error("Error clearing storage", error);
    }
  };

  useEffect(() => {
    if (!isClient) return;
    try {
      const storage = getStorage(rememberMe);
      const stored = storage.getItem(key);
      if (stored) {
        setStoredValue(stored);
      }
    } catch (error) {
      console.error("Error rehydrating storage", error);
    }
  }, [key, rememberMe]);

  return [storedValue, setValue, clearValue];
}

export default useLocalStorage;
