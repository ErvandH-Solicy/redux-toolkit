import { useEffect, useRef, useState } from 'react';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../../slices/github.api';
import { useDebounce } from '../../hooks/debounce';
import { IRepo, IUs } from '../../models/models';

import styles from './home.module.scss';
import RepoCard from '../repoCard/repoCard';

export default function Home() {
    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const debounce = useDebounce(search)
    const ref: any = useRef(null)
    const [selectedUser, setSelectedUser] = useState<IUs | undefined>();
    const { isLoading, isError, data } = useSearchUsersQuery(debounce, {
        skip: debounce.length < 1,
        refetchOnFocus: true
    })
    const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery()
    useEffect(() => {
        setDropdown(debounce.length > 1 && data?.length! > 0)
    }, [debounce, data])

    const clickHandler = (username: string) => {
        const user = data?.find(u => u.login === username);
        setSelectedUser(user);
        fetchRepos(username);
        setDropdown(false);
    }

    useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {

            if (dropdown && ref.current && !ref.current?.contains(e.target as HTMLElement)) {
                setDropdown(false);
            }
        };

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [dropdown]);

    return (
        <div className={styles.container}>
            {isError && <p>Someting went wrong...</p>}
            <div className={styles.input}>
                <input type="text"
                    placeholder='Search for Githab user name'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                {dropdown && <ul className={styles.dropdown}>
                    {isLoading && <p>Loading</p>}
                    {data?.map((user: IUs) => (
                        <li
                            onClick={() => clickHandler(user.login)}
                            key={user.id}
                            className={styles.li}
                        >
                            <img src={user.avatar_url} alt={user.avatar_url} width={60} className={styles.img} />
                            <div className={styles.infoSection}>
                                <span>{user.login}</span>
                                <span>{user.type}</span>
                                <span></span>
                            </div>
                        </li>
                    ))}
                </ul>}
                <div className={styles.main}>
                    {areReposLoading && <p>Respos are loading...</p>}
                    {repos?.map((repo: IRepo) => <RepoCard key={repo.id} repo={repo} user={selectedUser} />)}
                </div>
            </div>
        </div>
    )
}