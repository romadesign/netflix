import Navigation from '@/components/BackOfficeProvider/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import RightBar from '../../BackOfficeProvider/RightBar'
import styles from '../../../../styles/navbarProvider.module.css'

const AppLayout = ({ header, children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation  user={user}/>
            <main className={styles.content_nav_children}>{children}</main>
            <div className={styles.content_nav}>
            {/* <RightBar  user={user}/> */}
            </div>
        </div>
    )
}

export default AppLayout
