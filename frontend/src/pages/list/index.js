import AppLayout from '@/components/Layouts/AppLayout'
import Movie from '../../components/Movie';
import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import styles from '../../../styles/banner.module.css'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'

const Lists = () => {
    const { getCookie } = useAuth()
    if (typeof window !== 'undefined') {
        var account_id = getCookie('accountId')
    }

    const [lists, setLists] = useState()
    console.log(lists)

    useState(() => {
        getFilmsAccount()
    }, [account_id])

    async function getFilmsAccount() {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/account/${account_id}/list`,
        )
        const data = response.data.data
        return setLists(data)
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Mi Lista
                </h2>
            }>
            <Head>
                <title>Netflix - Lista</title>
            </Head>
            {lists !== undefined ?
                <>
                    <div className='pt-20 h-[100vh]  bg-[#141414]'>
                        <div className='pl-10 text-white text-xl'>
                            Mi lista
                        </div>
                        <div
                        className=' flex flex-wrap justify-center'>
                            {lists.map((item, id) => (
                                <Movie key={id} item={item} />
                            ))}
                        </div>
                    </div>
                </> :
                <>
                </>
            }
        </AppLayout>
    )
}
export default Lists
