import styles from './styles.module.scss'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export function SignInButton() {

  const isUserLoggedIn = true;

  return  isUserLoggedIn ? ( <button 
    type='button'
    className={styles.signInButton}
    >
      <FaGithub color="#04d361" />
      Vinicius Benso
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
    ) : ( 
      <button 
      type='button'
      className={styles.signInButton}
      >
        <FaGithub color="#EBA417" />
        Sign in with Github
      </button>
    );
}