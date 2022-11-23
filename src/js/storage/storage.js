class localStorageHandler {
  set = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  get = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  };

  remove = (key) => localStorage.removeItem(key);
}

export const storage = new localStorageHandler();
