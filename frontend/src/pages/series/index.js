import Banner from '@/components/Banner'
import AppLayout from '@/components/Layouts/AppLayout'
import SubNavigation from '@/components/Layouts/SubNavigation'
import Row from '@/components/Row'
import Head from 'next/head'
import styles from '../../../styles/banner.module.css'

const Series = () => {
  return (
    <AppLayout
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          Series
        </h2>
      }>
      <Head>
        <title>Netflix - Series</title>
      </Head>
      <SubNavigation title='Series Tv' />
      <div className={styles.background}>
        <Banner />
        <div className={styles.rows}>
          <Row title='Action' category_id={1} genre_id={1} />
          <Row title='Thriller' category_id={1} genre_id={2} />
          <Row title='Adventure' category_id={1} genre_id={3} />
          <Row title='Animated' category_id={1} genre_id={4} />
          <Row title='Comedy' category_id={1} genre_id={5} />
          <Row title='Drama' category_id={1} genre_id={6} />
          <Row title='Fantasy' category_id={1} genre_id={7} />
          <Row title='Horror' category_id={1} genre_id={8} />
          <Row title='Musical' category_id={1} genre_id={9} />
          <Row title='Romance' category_id={1} genre_id={10} />
        </div>
      </div>
    </AppLayout>
  )
}

export default Series
