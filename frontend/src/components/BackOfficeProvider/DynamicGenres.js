import { useEffect, useState } from "react";
import axios from 'axios'
import styles from '@/../../styles/login.module.css'

function DynamicGenres({ ListGenres, setListGenres, listDetailFilmGenreShow, setNewGenre, isCheck, setIsCheck, title, statusInfo, setStatusInfo }) {

	const [listSelectedTitle, setListSelectedTitle] = useState([])
	// const handleClick = (e) => {
	//   const { id, checked } = e.target;
	//   setIsCheck([...isCheck, id]);
	//   if (!checked) {
	//     setIsCheck(isCheck.filter((item) => item !== id));
	//   }
	// };

    console.log(ListGenres)

	const handleSelectChecbox = (id, title) => {
		setListSelectedTitle(
			listSelectedTitle.indexOf(title) === -1 ?
				[...listSelectedTitle, title] : listSelectedTitle.filter((x) => x !== title)
		)
		setIsCheck(
			isCheck.indexOf(id) === -1 ?
				[...isCheck, id] : isCheck.filter((x) => x !== id))
	}


	const detailGenreFilm = () => {
		if (listDetailFilmGenreShow !== undefined) {
			const dataFilmGenre = listDetailFilmGenreShow.map((lista) => {
				return lista.id
			})
			setIsCheck(dataFilmGenre)
		}
	}

	const genresEdit = () => {
		setIsCheck('')
		setNewGenre([])
		setStatusInfo(false)
	}

	useEffect(() => {
		getGenres()
		detailGenreFilm()
	}, [])
	async function getGenres() {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/genres`,
		)
		const data = response.data.data
		setListGenres(data)
	}

	return (
		<div>
			<div>
				<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">{title}</label>
				<div>
					<span>Generos elejidos</span>
                    {
                        !statusInfo !== true &&
                    <span onClick={() => genresEdit()}>Editar</span>
                    }
					<div className={styles.content_general_input}>
						{listSelectedTitle.map((selectedGenre, id) => (
							<div key={id} className={styles.content_general_input_selected}>
								{selectedGenre}
							</div>
						))}
						<div>
							<div className="flex flex-wrap">
								{listDetailFilmGenreShow !== undefined && (
									listDetailFilmGenreShow.length > 0 &&
									<>
										{listDetailFilmGenreShow.map((genre) => (
											<div key={genre.id} className={styles.genresContentListGet}>
												<div >
													{genre.title}
												</div>
											</div>
										))}
									</>
								)
								}
							</div>
						</div>
					</div>
				</div>
				{/* <div className={styles.content_general_input}>{ListGenres !== undefined && (
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
				}</div> */}

				{!statusInfo !== false &&
					(
						<>
							<span>Selecciona los generos para tu película</span>
							<div className={styles.content_general_input}>

								{ListGenres !== undefined &&
									ListGenres.map((genre) => (
										<div key={genre.id} className={styles.genresContent}>
											<div onClick={() => handleSelectChecbox(genre.id, genre.title)} >
												{genre.title}
											</div>
										</div>
									))
								}
							</div>
						</>
					)
				}
			</div>
		</div>
	)
}

export default DynamicGenres


//https://www.youtube.com/watch?v=XtS14dXwvwE arary
//https://www.youtube.com/watch?v=eGA5TCdjcSE
//https://www.youtube.com/watch?v=jn-iq1dKB38
//https://www.youtube.com/results?search_query=next+js+array+number+create+formData
