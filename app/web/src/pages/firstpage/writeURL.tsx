// 1. 状態管理（useState）を使うためにインポートを追加
import { useState } from "react";

export default function Home() {
  // 2. 生成された数字を保存するステート（初期値は空文字）
  const [randomNumber, setRandomNumber] = useState<number | string>("");

  // 3. ボタンが押されたときに実行する関数
  const generateNumber = () => {
    // 100から999までの範囲でランダムな整数を生成
    const num = Math.floor(Math.random() * 900) + 100;
    setRandomNumber(num);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>数字を生成</h1>
      <p style={styles.text}>
        URLからランダムな数字を生成します。
      </p>
      <label htmlFor="urlInput">URLを入力してください：</label>
      <input type="text" id="urlInput" placeholder="https://example.com" required />

      {/* 5. 数字が生成されている場合のみ画面に表示する */}
      {randomNumber && (
        <div style={styles.result}>
          生成された数字: <strong>{randomNumber}</strong>
        </div>
      )}

      {/* 4. ボタンにクリックイベント（onClick）を紐付け */}
      <button onClick={generateNumber} style={styles.button}>数字を生成</button>
    </div>
  );
}

const styles = {
  container: {
    lineHeight: "1.6",
  },
  title: {
    fontSize: "28px",
    marginBottom: "16px",
    color: "#007bff",
  },
  text: {
    fontSize: "16px",
    marginBottom: "24px",
  },
  card: {
    backgroundColor: "#fff",
    borderLeft: "5px solid #007bff",
    padding: "16px",
    borderRadius: "4px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    marginBottom: "20px", // ボタンとの余白を追加
  },
  // 結果表示とボタン用のスタイルを追加
  result: {
    fontSize: "20px",
    marginBottom: "16px",
    padding: "10px",
    backgroundColor: "#e7f3ff",
    borderRadius: "4px",
    color: "#007bff",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
