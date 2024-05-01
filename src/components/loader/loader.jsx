import loaderImage from '../../images/loader.gif';
import styles from './loader.module.css';

const Loader = () => {
  return (
    <div className={styles.container}>
      <img className={styles.loader} src={loaderImage} alt="loading..." />
    </div>
  );
};

export default Loader;