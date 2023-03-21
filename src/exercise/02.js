// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return React.Children.map(children, child => {
    // this condition doesn't resolve an issue if we add other components to Toggle as children
    // when they don't need the implicitly shared state, but overall,
    // they shouldn't be children of Toggle then
    // since they are not depandant on Toggle managing the state
    // (check alternatives https://react.dev/reference/react/Children)

    // UPDATE: we can restrict by type which is great
    // so we can now provide props to components we want to provide those props to
    // console.log(children[0].type === ToggleOn);
    if (allowedTypes.includes(child.type)) {
      return React.cloneElement(child, {on, toggle})
    }
    return child
  })
}

const ToggleOn = ({on, children}) => (on ? children : null)
const ToggleOff = ({on, children}) => (on ? null : children)
const ToggleButton = ({on, toggle}) => <Switch on={on} onClick={toggle} />

const allowedTypes = [ToggleOn, ToggleOff, ToggleButton]

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <span>Hello</span>
        <ToggleButton />
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
