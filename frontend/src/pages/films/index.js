import AppLayout from '@/components/Layouts/AppLayout'
import Row from '@/components/Row'
import Head from 'next/head'

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
			<div className="py-12">
				<Row title="Action" categoryId={1} />
				<Row title="Adventure" categoryId={2} />
			</div>
		</AppLayout>
	)
}

export default Films
