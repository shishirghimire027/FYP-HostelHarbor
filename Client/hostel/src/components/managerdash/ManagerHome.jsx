import React from 'react'
import HostelData from "./HostelData"
import ManagerChatInterface from './ManagerChatInterface'

function ManagerHome() {
  return (
    <div>
      <HostelData />
      <div className="chat-box">
        <ManagerChatInterface />

      </div>
    </div>
  )
}

export default ManagerHome
