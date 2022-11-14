import { useState } from 'react'

function App () {
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
            <div>
              <input
                name='name'
                type='text'
                value={protagonist.name}
                onChange={e => handleProtagonistsChange(e, i)}
                required
              />
              {protagonistsList.length - 1 === i &&
                protagonistsList.length < 20 && (
                  <button type='button' onClick={handleProtagonistsAdd}>
                    <span>Add</span>
                  </button>
                )}
            </div>
            <div>
              {protagonistsList.length !== 1 && (
                <button
                  type='button'
                  onClick={() => handleProtagonistsRemove(i)}>
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2>Output</h2>
        {protagonistsList &&
          protagonistsList.map((protagonist, i) => (
            <ul key={i}>{protagonist.name && <li>{protagonist.name}</li>}</ul>
          ))}
      </div>
    </div>
  )
}

export default App
