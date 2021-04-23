import React from 'react'

function VerifyError({message}) {
  return (
    <div>
      <div className="text-danger2 text-center info-danger" >
         {message}
      </div>
    </div>
  )
}

export default VerifyError
