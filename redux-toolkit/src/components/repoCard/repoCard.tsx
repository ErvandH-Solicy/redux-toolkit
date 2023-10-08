import { useState } from "react"
import useActions from "../../hooks/actions"
import { useAppSelector } from "../../hooks/redux"
import { IRepo, IUs } from "../../models/models"

import styles from './repoCard.module.scss'

export default function RepoCard({ repo, user }: { repo: IRepo, user?: IUs | undefined }): JSX.Element {
    const { addFavorite, removeFavorite } = useActions()
    const { favorites } = useAppSelector(state => state.github)

    const [isFav, setIsFav] = useState(favorites.includes(repo.html_url))

    const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        addFavorite(repo.html_url)
        setIsFav(true)
    }

    const removeToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        removeFavorite(repo.html_url)
        setIsFav(false)
    }

    return (
        <div className={styles.container}>
            <a href={repo.html_url} target="_blank" rel="noreferrer" >
                <h2>{repo.full_name}</h2>
                <ul>
                    <li className={styles.list}>
                        <img src={user?.avatar_url} alt={user?.avatar_url} width={60} className={styles.img} />

                        <div className={styles.infoSection}>
                            <span>{repo.url}</span>
                            <span>Forks: {repo.forks}</span>
                            <span>Watchers: {repo.watchers}</span>
                        </div>
                        <p>{repo?.description}</p>
                    </li>
                </ul>
            </a>
            {!isFav && <button
                className={styles.button}
                onClick={addToFavorite}>
                Add
            </button>
            }
            {isFav && <button
                className={styles.buttonD}
                onClick={removeToFavorite}>
                Remove
            </button>
            }
        </div>
    )
}