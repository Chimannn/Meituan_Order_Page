import foodsStore from "./modules/takeaway"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer: {
        foods: foodsStore,
    },
})

export default store