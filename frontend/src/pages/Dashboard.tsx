import { Navigate } from "react-router"
import LoadingModal from "../components/LodingModal"
import UserDashboard from "../components/UserDashboard"
import AdminDashboard from "../components/AdminDashboard"
import useFetchUser from "../hooks/user-managment"


export default function Dashboard () {
    const { loading, error, data } = useFetchUser()
    
    if (error) {
        return (<Navigate replace to='/login' />)
    }

    if (loading) {
        return (<LoadingModal showModal={ loading } message="Loading..." />)
    }
    
    return (
        <div className="w-full bg-gray-50">
            {
                data?.role === 'admin' ? (
                    <AdminDashboard />
                ) : (
                    <UserDashboard />
                )
            }
        </div>
    )
}