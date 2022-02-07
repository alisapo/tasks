import {ReactComponent as Search} from '../../images/search.svg';
import styles from './Header.module.css';


export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.search}>
        <input type="text" className={styles.searchfield} />
        <button className={styles.searchButton}><Search /></button>
      </div>
    </header>
  );
}
