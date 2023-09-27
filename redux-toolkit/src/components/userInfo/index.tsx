import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { RootState } from "../../store/store"
import { useEffect, useState } from "react";
import { IUser } from "../../type/user";

import styles from './userInfo.module.scss'

export default function UserInfo(): JSX.Element {
    const [userData, setUserData] = useState<IUser[]>([])
    const navigate = useNavigate();
    const { id } = useParams();
    const { data } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        if (id && data) {
            const user = data.find((u: any) => u.id == id)
            if (user) setUserData([user])
        } else {
            setUserData([])
        }
    }, [])

    const back = () => {
        navigate('/')
    }

    return (
        <>
            <button onClick={back} className={styles.back}>Go Back</button>
            <div className={styles.userInfoContainer}>
                <div className={styles.data}>
                    <h1>User ID {id}</h1>
                    {userData?.map((e: IUser) => (
                        <div key={e.id}>
                            <p>Name: {e.name}</p>
                            <p>Email: {e.email}</p>
                            <p>Phone: {e.phone}</p>
                            <p>UserName: {e.username}</p>
                            <p>City: {e.address.city}</p>
                            <p>Street: {e.address.street}</p>
                            <p>Suite: {e.address.suite}</p>
                            <p>Zipcode: {e.address.zipcode}</p>
                            <p>Catch Phrase: {e.company.catchPhrase}</p>
                            <p>Company Name: {e.company.name}</p>

                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}