function DynamicData ({ dataDinamic, setDataDinamic, title }) {
  const handleDataChange = (e, i) => {
    //capture el valor de la etiqueta name
    const { name, value } = e.target
    const list = [...dataDinamic]
    list[i] = value
    setDataDinamic(list)
  }

  const handleDataRemove = i => {
    const list = [...dataDinamic]
    list.splice(i, 1)
    setDataDinamic(list)
  }

  const handleDataAdd = () => {
    setDataDinamic([...dataDinamic, []])
  }

  return (
    <div>
      <div>
        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
          {title}
        </label>
        {dataDinamic.map((protagonist, i) => (
          <div key={i}>
            <div className='grid grid-cols-3 gap-4'>
              <input
                className='my-2 col-span-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                name='name'
                type='text'
                value={protagonist.name}
                onChange={e => handleDataChange(e, i)}
                required
              />
              {dataDinamic.length - 1 === i && dataDinamic.length < 20 && (
                <button
                  className=' my-2 col-span-1 bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  type='button'
                  onClick={handleDataAdd}>
                  Add
                </button>
              )}
              {dataDinamic.length !== 1 && (
                <button
                  className=' my-2 col-span-1 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  type='button'
                  onClick={() => handleDataRemove(i)}>
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DynamicData
