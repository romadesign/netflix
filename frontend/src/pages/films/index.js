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
					<Row title="Action" categoryId={1} />
					<Row title="Adventure" categoryId={2} />
					<Row title="Action" categoryId={1} />
					<Row title="Adventure" categoryId={2} />
				</div>
			</div>
		</AppLayout>
	)
}

export default Films
