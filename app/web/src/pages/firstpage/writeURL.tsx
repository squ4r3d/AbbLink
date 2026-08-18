import { useState } from "react";
import styles from "./writeURL.module.scss"; // CSSモジュールをインポート

export default function Home() {
  const [randomNumber, setRandomNumber] = useState<number | string>("");

  const generateNumber = () => {
    const num = Math.floor(Math.random() * 900) + 100;
    setRandomNumber(num);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>数字を生成</h1>
      <p className={styles.text}>
        URLからランダムな数字を生成します。
      </p>

      <label htmlFor="urlInput" className={styles.label}>
        URLを入力してください：
      </label>
      <input
        type="text"
        id="urlInput"
        className={styles.input}
        placeholder="https://example.com"
        required
      />

      {randomNumber && (
        <div className={styles.result}>
          生成された数字: <strong>{randomNumber}</strong>
        </div>
      )}

      <button onClick={generateNumber} className={styles.button}>
        数字を生成
      </button>
    </div>
  );
}