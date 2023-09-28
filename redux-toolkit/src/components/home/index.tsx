import { useSearchUsersQuery } from '../../slices/github.api';

import styles from './home.module.scss';

export default function Home() {
    const { isLoading, isError, data } = useSearchUsersQuery('ervand')
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    return (
        <>
        <div className={styles.container}>
            {isError && <p>Someting went wrong...</p>}

            <div className={styles.input}>
                <input type="text" placeholder='Search for Githab user name'/>

                <div className={styles.dropdown}>

                </div>
            </div>
        </div>
        </>
    )
}