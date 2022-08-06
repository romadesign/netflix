import AppLayout from '@/components/BackOfficeProvider/Layouts/AppLayout'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const Newpage = () => {

    return (
        <AppLayout>
            <Head>
                <title>Dashboard provider</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            You're logged in! te dirigiste a provider new pahe
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Newpage
