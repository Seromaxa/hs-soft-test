import { useState, useRef } from "react"
import "./App.css"
import { LIST } from "./store/apollo"
import { useQuery } from "@apollo/client"
import List from "./components/list"
import { Context } from "./store/context"
import { open, close, setLevelAndActiv, createData } from "./utilts"

function App() {
  const [data, setData] = useState([])
  const [myData, setMyData] = useState([])
  const [depth, setdepth] = useState({ m: 0, n: 0 })
  const [dis, setDisablet] = useState(false)
  const m = useRef(null)
  const n = useRef(null)

  useQuery(LIST, {
    onCompleted: norm,
  })

  function norm(data) {
    let modData = [...data.continents]
    modData = modData.map(setLevelAndActiv)
    setData(modData)
  }

  const openHendler = (ev) => {
    setData(open(data, "id", ev, "active"))
  }
  const closeHendler = () => {
    setData(close(data, "active"))
  }
  const submitHandler = (ev) => {
    ev.preventDefault()
    let m = +ev.target.m.value
    let n = +ev.target.n.value
    ev.target.m.value = null
    ev.target.n.value = null
    setDisablet(false)
    setMyData(createData(m, [], n))
  }
  const openForMyData = (ev) => {
    setMyData(createData(depth.m, myData, depth.n, ev))
  }
  const closeForMyData = () => {
    setMyData(close(myData, "active"))
  }
  const typeControl = (ev) => {
    if (!+ev.target.value) {
      ev.target.value = null
    }
    setdepth((prev) => {
      return {
        ...prev,
        [ev.target.name]: +ev.target.value,
      }
    })
    !!m.current.value && !!n.current.value
      ? setDisablet(true)
      : setDisablet(false)
  }

  return (
    <div className="App">
      <div className="wrapper">
        <Context.Provider value={{ open: openHendler, close: closeHendler }}>
          <ul className="wrapper-list">
            {data
              ? data.map((item, ind) => (
                  <List item={item} key={Math.random() + item.name + ind} />
                ))
              : null}
          </ul>
        </Context.Provider>
      </div>
      <div className="form_wrapper">
        <form onSubmit={submitHandler} onChange={typeControl}>
          <div className="input_wrapper">
            <label htmlFor="m1">Number of children in each node</label>
            <input id="m1" ref={m} name="m" autoComplete="off" />
          </div>
          <div className="input_wrapper">
            <label htmlFor="n1">Depth of tree</label>
            <input id="n1" name="n" ref={n} autoComplete="off" />
          </div>

          {dis ? (
            <button className="sub_button" type="submit">
              Click
            </button>
          ) : (
            <button className="sub_button" type="submit" disabled>
              Click
            </button>
          )}
        </form>
      </div>

      <div className="wrapper">
        <Context.Provider
          value={{ open: openForMyData, close: closeForMyData }}
        >
          <ul className="wrapper-list">
            {myData
              ? myData.map((item, ind) => (
                  <List item={item} key={Math.random() + item.name + ind} />
                ))
              : null}
          </ul>
        </Context.Provider>
      </div>
    </div>
  )
}

export default App
