import styles from '../../styles/loader.module.css'

const Loading = () => {
  return (
    <>
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner}></div>
      </div>
    </>
  )
}

export default Loading
