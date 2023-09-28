import { Link } from 'react-router-dom'
import styles from './navigate.module.scss'

export default function Navigate() {
    return(
        <nav className={styles.navigate}>

            <h3>Github Search</h3>
            <span>
                <Link to='/' className={styles.nav}>Home</Link>
                <Link to='/favorites' className={styles.nav}>Favorites</Link>
                <Link to='/users'>Users</Link>
            </span>
        </nav>
    )
}