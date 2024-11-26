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
            console.log(state.carList.length);
            
        },
        increCount(state, action) {
            const item = state.carList.find(item => item.id === action.payload.id)
            item.count += 1
        },
        decreCount(state, action) {
            const item = state.carList.find(item => item.id === action.payload.id)
            item.count --
            if(item.count == 0) {
                state.carList = state.carList.filter(item => item.id != action.payload.id)
                return 
            }
        },
        clearCar(state) {
            state.carList = []
        },
    }
})

const { setFoodsList, changeActiveIndex, addCart, increCount, clearCar, decreCount } = foodsStore.actions

const fetchFoodsList = () => {
    return async (dispatch) => {
        const res = await axios.get("http://localhost:3004/takeaway")
        dispatch(setFoodsList(res.data))
    }
}

export { fetchFoodsList, changeActiveIndex, addCart, increCount, clearCar, decreCount }
const reducer = foodsStore.reducer

export default reducer