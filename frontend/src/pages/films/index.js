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
					<Row title="Action" categoryId={3} />
					<Row title="Adventure" categoryId={4} />
					<Row title="Adventure" categoryId={5} />
					<Row title="Adventure" categoryId={6} />
					<Row title="Adventure" categoryId={7} />
					<Row title="Adventure" categoryId={8} />
					<Row title="Adventure" categoryId={9} />
					<Row title="Adventure" categoryId={10} />
					<Row title="Adventure" categoryId={11} />
					<Row title="Adventure" categoryId={12} />
				</div>
			</div>
		</AppLayout>
	)
}

export default Films
