import classNames from 'classnames'
import React from'react';
import Count from '../Count'
import './index.scss'
import { useSelector, useDispatch } from "react-redux";
import { increCount, decreCount, clearCar } from "../../store/modules/takeaway";
import { useState } from "react";

const Cart = () => {
  const { carList } = useSelector(state => state.foods)
  const totalPrice = carList.reduce((acc, item) => acc + item.price * item.count, 0)
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const onShow = () => {
    if(carList.length > 0) {
      setVisible(true)
    }
  }

  return (
    <div className="cartContainer" >
      {/* 遮罩层 添加visible类名可以显示出来 */}
      <div
        className={classNames('cartOverlay', visible && 'visible')}
        onClick={()=>setVisible(false)}
      />
      <div className="cart">
        {/* fill 添加fill类名可以切换购物车状态*/}
        {/* 购物车数量 */}
        <div onClick={onShow} className={classNames('icon', carList.length > 0 && 'fill')}>
          {carList.length > 0 && <div className="cartCornerMark">{carList.length}</div>}
        </div>
        {/* 购物车价格 */}
        <div className="main">
          <div className="price">
            <span className="payableAmount">
              <span className="payableAmountUnit">¥</span>
              {totalPrice.toFixed(2)}
            </span>
          </div>
          <span className="text">预估另需配送费 ¥5</span>
        </div>
        {/* 结算 or 起送 */}
        {carList.length > 0 ? (
          <div className="goToPreview">去结算</div>
        ) : (
          <div className="minFee">¥20起送</div>
        )}
      </div>
      {/* 添加visible类名 div会显示出来 */}
      <div className={classNames('cartPanel', visible && 'visible')}>
        <div className="header">
          <span className="text">购物车</span>
          <span className="clearCart" onClick={()=>{dispatch(clearCar());setVisible(false)}}>
            清空购物车
          </span>
        </div>

        {/* 购物车列表 */}
        <div className="scrollArea">
          {carList.map(item => {
            return (
              <div className="cartItem" key={item.id}>
                <img className="shopPic" src={item.picture} alt="" />
                <div className="main">
                  <div className="skuInfo">
                    <div className="name">{item.name}</div>
                  </div>
                  <div className="payableAmount">
                    <span className="yuan">¥</span>
                    <span className="price">{item.price}</span>
                  </div>
                </div>
                <div className="skuBtnWrapper btnGroup">
                  <Count
                    count={item.count}
                    onPlus={()=> dispatch(increCount({id: item.id}))}
                    onMinus={()=> dispatch(decreCount({id: item.id}))}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Cart
