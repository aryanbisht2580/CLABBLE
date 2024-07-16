import React from 'react'

import { Spinner } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { SyncLoader } from 'react-spinners'
const SpinnerCustom = () => {
  return (
    <div className='bg-black-bg flex justify-center items-center  h-9'>

<SyncLoader />
</div>
  )
}

export default SpinnerCustom