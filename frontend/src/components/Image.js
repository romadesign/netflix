import { useState } from 'react'
import Label from './Label'

function Image ({ datafiles, setFile }) {
  const [hideInputSelectImage, sethideInputSelectImage] = useState(true)
  const [createObjectURL, setCreateObjectURL] = useState(null)

  const handleFileImage = e => {
    sethideInputSelectImage(!true)
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0]
      if (createObjectURL === undefined) {
        setFile(datafiles)
      } else {
        setFile(i)
        setCreateObjectURL(URL.createObjectURL(i))
      }
    }
  }

  const handleClose = e => {
    e.preventDefault()
    console.log('hjola')
    sethideInputSelectImage(!false)
  }

  return (
    <div className='py-3 justify-center items-center px-2'>
      <div className='p-2'>
        <Label htmlFor='rating'>Backdrop path</Label>
        {hideInputSelectImage !== false && (
          <div className='h-32 w-full relative border-2 items-center rounded-md cursor-pointer border-gray-400 border-dotted'>
            <input
              type='file'
              onChange={handleFileImage}
              className='h-full w-full bg-green-200 opacity-0 z-10 left-0 absolute cursor-pointer'
              multiple
              name='files[]'
            />
            <div className='h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0'>
              <div className='flex flex-col'>
                <i className='mdi mdi-folder-open text-[30px] text-gray-400 text-center'></i>
                <span className='text-[12px]'>{`Arrastrar una imagen`}</span>
              </div>
            </div>
          </div>
        )}
        <div className='flex flex-wrap gap-2 mt-2 justify-center'>
          {datafiles !== '' && (
            <div className='overflow-hidden relative p-4 bg-[#cacaca45]'>
              <img
                className='h-[320px] w-[320px] rounded-md object-cover'
                src={
                  createObjectURL !== null
                    ? createObjectURL
                    : `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/` +
                      datafiles
                }
              />
              <button
                onClick={handleClose}
                className='absolute top-0 right-0 text-center bg-[#ffffffa3] hover focus:outline-none'>
                <svg
                  aria-hidden='true'
                  focusable='false'
                  data-prefix='fas'
                  data-icon='times'
                  className='w-3 m-3'
                  role='img'
                  viewBox='0 0 352 512'>
                  <path
                    fill='currentColor'
                    d='M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z'></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Image
