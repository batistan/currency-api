import styles from './Footer.module.css';

export default function Footer() {
  return <footer className={styles.footer}>
    <p>Made with ❤️ and ☕ by <a href="https://sorou.tech" target="_blank" rel="noreferrer noopener">sorou.tech</a></p>
    <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
  </footer>
}
