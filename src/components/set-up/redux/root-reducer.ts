"use client";
import { combineReducers } from "redux";
import authReducer from "../../Redux/Auth";
import currencyReducer from "../../Redux/Currency";
import subCategoryIdReducer from "../../Redux/subCategoryId";

export const rootReducer = combineReducers({
	auth: authReducer,
	currency: currencyReducer,
	subCategoryId: subCategoryIdReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
