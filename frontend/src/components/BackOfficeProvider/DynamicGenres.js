import { useEffect, useState } from "react";
import axios from 'axios'
import styles from '@/../../styles/login.module.css'

function DynamicGenres({ ListGenres, setListGenres,isCheck, setIsCheck, title }) {
	
	const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };


	 const handleSelectChecbox = (id) => {
    setIsCheck(
      isCheck.indexOf(id.toString()) === -1 ? 
        [...isCheck, id.toString()] : isCheck.filter((x) => x !== id.toString()))
  }

	return (
		<div>
			<div>
				<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">{title}</label>
				<div>
					<span>Generos elejidos</span>
				</div>
				<div className={styles.content_general_input}>{ListGenres !== undefined && (
					ListGenres.map((genre) => (
						<div key={genre.id} className={styles.genresContent}>
							<input
								checked={isCheck.includes(genre?.id.toString())}
								onChange={handleClick}
								name={genre?.id}
								id={genre?.id}
								type="checkbox"
								className={styles.genresinput}
							/>
							<span>{genre.title}</span>
						</div>
					)))
				}</div>
				<div>
				{ListGenres !== undefined && (
					ListGenres.map((genre) => (
						<div key={genre.id} >
							<div onClick={() => handleSelectChecbox(genre.id)}
							className="pt-2">
							{genre.title}
						</div>
						</div>
					)))
				}
				</div>
			</div>
		</div>
	)
}

export default DynamicGenres


//https://www.youtube.com/watch?v=XtS14dXwvwE arary
//https://www.youtube.com/watch?v=eGA5TCdjcSE
//https://www.youtube.com/watch?v=jn-iq1dKB38
//https://www.youtube.com/results?search_query=next+js+array+number+create+formData