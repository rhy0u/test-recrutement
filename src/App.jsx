import { useState } from "react"
import Event from "./Event"
import input from "./input.json"
import { getEvents } from "./utils/organizeEvents"

const App = () => {
  const events = getEvents(input)
  return (
    <div className="App">
      <ul>
        {events.map((event) => {
          return <Event {...event} key={event.id} />
        })}
      </ul>
    </div>
  )
}

export default App
