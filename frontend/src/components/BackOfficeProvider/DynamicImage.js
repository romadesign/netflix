function DynamicImage({ datafiles, setFile }) {

  const handleFile = e => {
    const files = e.target.files
    const file = files[0]
    getBase64(file)
  }

  const onLoad = fileString => {
    setFile(fileString)
  }

  const getBase64 = file => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      onLoad(reader.result)
    }
  }

  const removeImage = i => {
    setFile(datafiles.filter(x => x.name !== i))
  }

  return (
    <div className="py-3 flex justify-center items-center bg-gray-300 px-2">
      <div className="p-3 md:w-1/2 w-[360px] bg-white rounded-md">
        <div className="h-32 w-full relative border-2 items-center rounded-md cursor-pointer bg-gray-300 border-gray-400 border-dotted">
          <input
            type="file"
            onChange={handleFile}
            className="h-full w-full bg-green-200 opacity-0 z-10 absolute"
            multiple
            name="files[]"
          />
          <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
            <div className="flex flex-col">
              <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
              <span className="text-[12px]">{`Drag and Drop a file`}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="overflow-hidden relative">
            <img className="h-20 w-20 rounded-md" src={datafiles} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DynamicImage
