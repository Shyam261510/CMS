"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./Store";
import { PersistGate } from "redux-persist/integration/react";

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading="null" persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
