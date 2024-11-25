import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const foodsStore = createSlice({
    name: "foods",
    initialState: {
        foodsList: [],
        activeIndex: 0,
        carList: [],
    },
    reducers: {
        setFoodsList: (state, action) => {
            state.foodsList = action.payload
        },
        changeActiveIndex: (state, action) => {
            state.activeIndex = action.payload
        },
        addCart: (state, action) => {
            const item = state.carList.find(c => c.id === action.payload.id);
            if(item) {
                item.count += 1
            }else {
                state.carList.push(action.payload)
            }
        }
    }
})

const { setFoodsList, changeActiveIndex, addCart } = foodsStore.actions

const fetchFoodsList = () => {
    return async (dispatch) => {
        const res = await axios.get("http://localhost:3004/takeaway")
        dispatch(setFoodsList(res.data))
    }
}

export { fetchFoodsList, changeActiveIndex, addCart }
const reducer = foodsStore.reducer

export default reducer