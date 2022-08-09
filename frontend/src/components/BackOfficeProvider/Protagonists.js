import { useState } from 'react'

function Protagonists() {
  const [protagonistsList, setProtagonists] = useState([{ name: '' }])

  const handleProtagonistsChange = (e, i) => {
    //capture el valor de la etiqueta name
    const { name, value } = e.target
    const list = [...protagonistsList]
    list[i][name] = value
    setProtagonists(list)
  }

  const handleProtagonistsRemove = i => {
    const list = [...protagonistsList]
    list.splice(i, 1)
    setProtagonists(list)
  }

  const handleProtagonistsAdd = () => {
    setProtagonists([...protagonistsList, { name: '' }])
  }

  return (
    <div>
      <div>
        <label>protagonists(s)</label>
        {protagonistsList.map((protagonist, i) => (
          <div key={i}>
            <div className="grid grid-cols-3 gap-4">
              <input
               className="my-2 col-span-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="name"
                type="text"
                value={protagonist.name}
                onChange={e => handleProtagonistsChange(e, i)}
                required
              />
              {protagonistsList.length - 1 === i &&
                protagonistsList.length < 20 && (
                  <button
                  className=" my-2 col-span-1 bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                   type="button" onClick={handleProtagonistsAdd}>
                    Add
                  </button>
                )}
                {protagonistsList.length !== 1 && (
                <button
                  className=" my-2 col-span-1 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={() => handleProtagonistsRemove(i)}>
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

export default Protagonists
