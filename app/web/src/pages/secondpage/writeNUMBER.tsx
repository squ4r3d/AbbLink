import { useState } from "react";
import styles from "./writeNUMBER.module.scss";

export default function Home() {
  // 入力された数字を管理するステート
  const [inputNumber, setInputNumber] = useState<string>("");
  // 表示用URLを管理するステート
  const [submittedUrl, setSubmittedUrl] = useState<string>("");

  const handleSubmit = () => {
    if (!inputNumber) return;
    // 例: 入力された数字をもとにURLを生成
    setSubmittedUrl(`https://example.com/page/${inputNumber}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>数字を入力</h1>
      <p className={styles.text}>
        数字を入力して、対応するURLを表示します。
      </p>

      <label htmlFor="urlInput" className={styles.label}>
        数字を入力してください：
      </label>
      <input
        type="text"
        id="urlInput"
        placeholder="100-999"
        value={inputNumber}
        onChange={(e) => setInputNumber(e.target.value)}
        className={styles.input}
        required
      />

      <button onClick={handleSubmit} className={styles.button}>
        URLを表示
      </button>

      {/* 結果が表示される場合、SCSSの.cardと.resultスタイルを適用 */}
      {submittedUrl && (
        <div className={styles.card}>
          <div className={styles.result}>
            対応するURL:{" "}
            <a href={submittedUrl} target="_blank" rel="noreferrer">
              <strong>{submittedUrl}</strong>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}