import { useAppSelector } from '../../hooks/redux'
import styles from './favorite.module.scss'

export default function Favorites() {
   const {favorites} = useAppSelector(state => state.github)

   if(favorites.length === 0) return <p>No items</p>
    return(
        <div className={styles.main}>
            <ul className={styles.container}>
                {favorites.map(f => (
                    <li key={f} className={styles.lisa}>
                        <a href={f} target='_blank' rel="noreferrer" >{f}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}