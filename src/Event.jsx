import styled, { css } from "styled-components"

const StyledEvent = styled.li`
  width: ${(p) => p.width};
  height: ${(p) => p.height};
  top: ${(p) => p.top};
  left: ${(p) => p.left};
  background-color: ${(p) => p.color};
  
  position: absolute;
  box-shadow:inset 0px 0px 0px 1px #000;
  /* border: 1px solid black; */
  border-radius: 8px;
  
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  
  p {
    text-align: center;
    font-size: 0.6rem;
  }
`

const Event = ({ id, width, height, top, left, color }) => {
  return (
    <StyledEvent
      id={id}
      width={width}
      height={height}
      top={top}
      left={left}
      color={color}
    >
      <p>{id}</p>
    </StyledEvent>
  )
}

export default Event
