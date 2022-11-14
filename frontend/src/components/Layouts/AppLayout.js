import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'

const AppLayout = ({ header, children }) => {
  const { user } = useAuth({ middleware: 'auth' })

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navigation user={user} />
      {/* Page Content */}
      <main>{children}</main>
    </div>
  )
}

export default AppLayout
