import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from '../features/invoiceSlice';

// Load invoices from localStorage (if available)
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('invoices');
    if (serializedState === null) return undefined;
    return {
      invoices: JSON.parse(serializedState),
    };
  } catch (e) {
    console.warn("Failed to load invoices from localStorage", e);
    return undefined;
  }
};

// Save invoices to localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state.invoices);
    localStorage.setItem('invoices', serializedState);
  } catch (e) {
    console.warn("Failed to save invoices to localStorage", e);
  }
};

const store = configureStore({
  reducer: {
    invoices: invoiceReducer,
  },
  preloadedState: loadFromLocalStorage(),
});

// Subscribe to store updates
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;

