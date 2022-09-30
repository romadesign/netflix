import Banner from '@/components/Banner'
import AppLayout from '@/components/Layouts/AppLayout'
import Row from '@/components/Row'
import Head from 'next/head'
import styles from '../../../styles/banner.module.css'

const Films = () => {


	return (
		<AppLayout
			header={
				<h2 className="font-semibold text-xl text-gray-800 leading-tight">
					Peliculas
				</h2>
			}>
			<Head>
				<title>Netflix - Peliculas</title>
			</Head>
			<div className={styles.background}>
				<Banner />
				<div className={styles.rows}>
					<Row title="Action" genre_id={1} />
					<Row title="Thriller" genre_id={2} />
					<Row title="Adventure" genre_id={3} />
					<Row title="Animated" genre_id={4} />
					<Row title="Comedy" genre_id={5} />
					<Row title="Drama" genre_id={6} />
					<Row title="Fantasy" genre_id={7} />
					<Row title="Horror" genre_id={8} />
					<Row title="Musical" genre_id={9} />
					<Row title="Romance" genre_id={10} />
				</div>
			</div>
		</AppLayout>
	)
}

export default Films
