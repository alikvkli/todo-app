import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { encryptTransform } from "redux-persist-transform-encrypt";
import todo from "../features/todo";
import storage from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";

const encryptor = encryptTransform({
    secretKey: "92AnjeTSSnnRHbhR0QBjs3fQiqRQRXKH"
});

const reducers = combineReducers({
    todo
});

const persistConfig = {
    key: "root",
    storage: storage,
    transforms: [encryptor]
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});


export const persistor = persistStore(store);