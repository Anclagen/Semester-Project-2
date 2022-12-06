/**
 * Handles local storage
 */
class localStorageHandler {
  /**
   * Sets an item in local storage
   * @param {string} key
   * @param {any} value
   */
  set = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  /**
   * Returns an item from local storage
   * @param {string} key
   * @returns {any} returns parsed value from storage
   */
  get = (key) => {
    if (JSON.parse(localStorage.getItem(key)) !== null) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return false;
    }
  };

  /**
   * Deletes an item from local storage
   * @param {string} key
   */
  remove = (key) => localStorage.removeItem(key);
}

export const storage = new localStorageHandler();
