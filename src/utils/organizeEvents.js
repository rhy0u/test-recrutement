const DAY_START = 9 * 60
const DAY_END = 12 * 60
const MAX_COLOR_VALUE = 16777216

const simplifyEvents = (events) => {
  const simplifiedEvents = events.map((event) => {
    const [hours, minutes] = event.start.split(":").map((event) => +event)
    const start = hours * 60 + minutes - DAY_START

    return {
      id: event.id,
      start,
      end: start + event.duration,
    }
  })

  return simplifiedEvents
}

const sortEvents = (events) => {
  return [...events].sort((eventA, eventB) => {
    return eventA.start - eventB.start
  })
}

const collidesWith = (eventA, eventB) => {
  return eventA.end > eventB.start && eventA.start < eventB.end
}

function getRandomColor() {
    return  `#${Math.floor(Math.random() * MAX_COLOR_VALUE).toString(16)}`
  }

const getEventsWithCollisions = (events) => {
  const eventsWithCollisions = events.map((event, i) => {
    const newEvent = { ...event, cols: [], colsBefore: [] }

    events.forEach((comparedEvent, j) => {
      if (collidesWith(newEvent, comparedEvent)) {
        newEvent.cols = [...newEvent.cols, j]
        if (i > j) newEvent.colsBefore = [...newEvent.colsBefore, j]
      }
    })
    return newEvent
  })

  return eventsWithCollisions
}

function addConflictsToGroup(event, events) {
  for (k = 0; k < envent.cols.length; k++) {
    if (conflictGroup.indexOf(envent.cols[k]) === -1) {
      conflictGroup.push(envent.cols[k])
      conflictingColumns.push(events[envent.cols[k]].column)
      addConflictsToGroup(events[envent.cols[k]]) //check also the events this event conflicts with
    }
  }
}

function enhenceEvents(events) {
  const eventArr = getEventsWithCollisions(events)
  eventArr.map((event, i) => {
    event.height = `${(event.end - event.start) / DAY_END * 100}vh`
    event.top = `${event.start / DAY_END * 100}vh`
    event.color = getRandomColor()

    if (i > 0 && event.colsBefore.length > 0) {
      if (eventArr[i - 1].column > 0) {
        eventArr.forEach((_, j) => {
          if (j < eventArr[i - 1].column) {
            if (event.colsBefore.indexOf(i - (j + 2)) === -1) {
              event.column = eventArr[i - (j + 2)].column
            }
          }
        })
        if (typeof event.column === "undefined")
          event.column = eventArr[i - 1].column + 1 
      } else {
        let column = 0
        eventArr.forEach((_, j) => {
          if (j < event.colsBefore.length) {
            if (
              eventArr[event.colsBefore[event.colsBefore.length - 1 - j]]
                .column == column
            )
              column++
          }
        })
        event.column = column
      }
    } else event.column = 0
  })
  eventArr.forEach((event, i) => {
    event.totalColumns = 0
    if (event.cols.length > 1) {
      const conflictGroup = [] 
      const conflictingColumns = []
      addConflictsToGroup(event)
      function addConflictsToGroup(event) {
        event.cols.forEach((_, k) => {
          if (conflictGroup.indexOf(event.cols[k]) === -1) {
            conflictGroup.push(event.cols[k])
            conflictingColumns.push(eventArr[event.cols[k]].column)
            addConflictsToGroup(eventArr[event.cols[k]]) 
          }
        })
      }
      event.totalColumns = Math.max(...conflictingColumns) 
    }
    event.width = `${100 / (event.totalColumns + 1)}vw`
    event.left = `${
      (100 / (event.totalColumns + 1)) * event.column
    }vw`
  })
  return eventArr
}

export const getEvents = (events) => {
  const simplifiedEvents = simplifyEvents(events)
  const sortedEvents = sortEvents(simplifiedEvents)
  const enhencedEvents = enhenceEvents(sortedEvents)
  return enhencedEvents
}
