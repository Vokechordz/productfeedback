import React, { useState } from 'react'
import { Spiral as Hamburg } from 'hamburger-react'

const Hamburger = () => {



    const [isOpen, setOpen] = useState(false)


  return (
    <div>
        <Hamburg />
    </div>
  )
}

export default Hamburger