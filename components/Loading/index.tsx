import styles from './loading.module.css';


const Loading = () => {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <span className={styles.loader}></span>
        </div>
    )
}

export default Loading;
