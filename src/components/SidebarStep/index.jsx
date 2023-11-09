import React from 'react'
import Classes from './style.module.scss'

const SidebarStep = ({step,title,active,locale,theme}) => {
  return (
  <div className={Classes.SidebarSteps}>
    <div className={Classes.SidebarStep}>
        <span className={active ? `${Classes.SidebarstepNumber} ${Classes.active}` : Classes.SidebarstepNumber} >{step} </span>
        <div className={Classes.SidebarstepInfo}>
        <span>STEP {step}</span>
        <p>{title}</p>
      </div>
    </div>
  </div>
  )
}

export default SidebarStep
