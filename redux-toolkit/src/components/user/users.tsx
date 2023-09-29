import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, fetchUserData, deleteUser } from '../../slices/data';
import { RootState } from '../../store/store';
import { IUser } from '../../type/user';
import { useNavigate } from 'react-router-dom';

import styles from './user.module.scss';

export default function Users(): JSX.Element {
  const { data, status, error } = useSelector((state: RootState) => state.rootReducer.users);
  const dispatch = useDispatch();
  const [isValue, setIsValue] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setIsValue(e.target.value);
  };

  const handleAddUser = () => {
    if (isValue.trim()) {
      dispatch(addUser(isValue))
      setIsValue('')
    }
  };

  const handleRemoveUser = (id: any) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const routeUserInfo = (id: any) => {
    navigate(`/userInfo/${id}`)
  }

  return (
    <div className={styles.users}>
      <div className={styles.inputSection}>
        <input type="text" onChange={(e) => handleChange(e)} value={isValue} placeholder='Add user' />
        <button type="button" onClick={handleAddUser} className={styles.addUserButton}>Add User</button>
      </div>
      {data?.map((e: IUser) => (
        <div key={e.id} className={styles.container}>
          <div className={styles.userInfoSection}>
            <div  onClick={() => routeUserInfo(e?.id)} className={styles.userName}>{e.name}</div>
          </div>
          <div className={styles.iconSection}>
            <button className={styles.delete}
              onClick={() => handleRemoveUser(e?.id)}
            >&times;</button>
          </div>
        </div>
      ))}
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
    </div>
  )
}
