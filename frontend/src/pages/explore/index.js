import Head from 'next/head'
import axios from 'axios'
import AppLayout from '@/components/Layouts/AppLayout'
import Movie from '../../components/Movie';
import { useAuth } from '@/hooks/auth'
import styles from '../../../styles/banner.module.css'
import { useEffect, useMemo, useState } from 'react'
import { MdChevronRight } from 'react-icons/md';

const Explore = () => {
    const { getCookie } = useAuth()
    if (typeof window !== 'undefined') {
        var account_id = getCookie('accountId')
        var token = getCookie('token')
    }

    const [lists, setLists] = useState([])

    const [pagination, setpagination] = useState('')
    const [current_page, setcurrent_page] = useState('')
    const [next_page_url, setnext_page_url] = useState('')
    const [first_page_url, setfirst_page_url] = useState('')
    const [prev_page_url, setprev_page_url] = useState('')
    const [totalPage, settotalPage] = useState('')


    async function getFilmsAccount() {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lists/explore`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )

        const data = response.data.data
        setpagination(response.data.data)
        setcurrent_page(response.data.data.current_page)
        setnext_page_url(response.data.data.next_page_url)
        setfirst_page_url(response.data.data.first_page_url)
        setprev_page_url(response.data.data.prev_page_url)
        settotalPage(response.data.data.total)
        setLists(data.data)
    }


    useEffect(() => {
        getFilmsAccount()
    }, [])

	async function sliderRigth() {
		if (next_page_url !== null ) {
			const response = await axios.get(`${next_page_url}` )
			const data = response.data
			setprev_page_url(data.data.prev_page_url)
			//nextPage
			setcurrent_page(data.data.current_page)
			setnext_page_url(data.data.next_page_url)
			//update data
			setLists((prevResults) => [...prevResults, ...data.data.data]);
			setpagination(data.data)
        }
	};


    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Explorar por idiomas
                </h2>
            }>
            <Head>
                <title>Netflix</title>
            </Head>
            {lists !== undefined ?
                <div className='h-[100vh] relative pt-20 bg-[#141414] '>
                    <div className='bg-[#141414]'>
                        <div className='absolute t-0 z-10 w-full '>
                            <div className='pl-10 text-white text-xl'>
                                Explorar por idiomas
                            </div>
                            <div className='flex flex-wrap pt-4 pb-10 gap-4 items-center '>
                                <div className='pl-10 text-white text-sm'>
                                    Selecciona tus preferencias
                                </div>
                                <div className="">
                                    <select className="text-sm text-white bg-[#2e2e2e87] pl-2 pr-2 border-[1px] w-[100px] border-inherit">
                                        <option className='text-white  text-sm bg-[black]' selected>País</option>
                                        <option className='text-white  text-sm bg-[black]' value="1">país</option>
                                    </select>
                                </div>
                                <div className='text-white text-sm'>
                                    Ordenar por
                                </div>
                                <div className="">
                                    <select className="text-sm text-white bg-[#2e2e2e87] pl-2 pr-2 border-[1px] border-inherit">
                                        <option className='text-white  text-sm bg-[black]' selected>Suregrencias para ti</option>
                                        <option className='text-white  text-sm bg-[black]' value="1">país</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div
                            className=' flex flex-wrap justify-center pt-10'>
                            {lists.map((item, id) => (
                                <Movie key={id} item={item} />
                            ))}

                        </div>

                        <MdChevronRight
							disabled={next_page_url == null}
							onClick={sliderRigth}
							className='bg-white'
							size={40}
						/>
                    </div>
                </div> :
                <>
                </>
            }
        </AppLayout>
    )
}



export default Explore
