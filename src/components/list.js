import React, { useContext } from "react"
import { Context } from "../store/context"

const List = ({ item }) => {
  const { open, close } = useContext(Context)
  const levelForWidth = 2
  const paddingOfList = 40
  const lastPoint = 20

  return (
    <li className="list-item">
      <div
        className="gorisontal"
        style={{
          width:
            item.level < 3
              ? item.level < 2
                ? 0
                : item.level * 10
              : (item.level - levelForWidth) * paddingOfList + lastPoint,
        }}
      ></div>
      <div
        className="name"
        onClick={item.opener ? () => open(item.id) : () => close()}
      >
        {item.name}
      </div>

      {item.active
        ? Object.keys(item).map((keyItem) =>
            Array.isArray(item[keyItem]) ? (
              <ul key={Math.random()} className="list">
                {item[keyItem].map((subItem) => {
                  return (
                    <List item={subItem} key={subItem.name + Math.random()} />
                  )
                })}
              </ul>
            ) : null
          )
        : null}
    </li>
  )
}
export default List
