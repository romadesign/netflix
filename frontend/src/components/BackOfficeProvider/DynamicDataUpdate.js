function DynamicData ({ dataDinamicUpdate, setDataDinamic, title }) {
  console.log()
  const handleDataChange = (e, i) => {
    //capture el valor de la etiqueta name
    const { name, value } = e.target
    const list = [...dataDinamicUpdate]
    list[i] = value
    setDataDinamic(list)
  }

  const handleDataRemove = i => {
    const list = [...dataDinamicUpdate]
    list.splice(i, 1)
    setDataDinamic(list)
  }

  const handleDataAdd = () => {
    setDataDinamic([...dataDinamicUpdate, []])
  }

  return (
    <div>
      <div>
        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
          {title}
        </label>
        {dataDinamicUpdate.map((protagonist, i) => (
          <div key={i}>
            <div className='grid grid-cols-3 gap-4'>
              <input
                className='my-2 col-span-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                name='name'
                type='text'
                value={dataDinamicUpdate[i]}
                onChange={e => handleDataChange(e, i)}
                required
              />
              {dataDinamicUpdate.length - 1 === i &&
                dataDinamicUpdate.length < 20 && (
                  <button
                    className=' my-2 col-span-1 bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    type='button'
                    onClick={handleDataAdd}>
                    Add
                  </button>
                )}
              {dataDinamicUpdate.length !== 1 && (
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
