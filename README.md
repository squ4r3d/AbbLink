# Welcome to abbLink

This app is developed by SQu4r3d.

## What is this app

You can easily share URL with this app.

## 技術スタック

- Node.js 20+
- TypeScript 6
- npm workspaces（モノレポ）
- **フロントエンド:** React 19 + Vite 8
- **バックエンド:** Hono + @hono/node-server + tsx
- **共有パッケージ:** Zod（スキーマ定義）

## ディレクトリ構成

```
├── app/
│   ├── api/          Hono バックエンド API
│   └── web/          React + Vite フロントエンド
├── packages/
│   └── shared/       共有スキーマ・エンドポイント定義 (Zod)
├── docker/
│   ├── api.Dockerfile
│   ├── web.Dockerfile
│   └── nginx.conf
├── docker-compose.yml
└── package.json      Workspaces ルート
```

## 必要な環境

- [Node.js](https://nodejs.org/) 20 以上
- npm（Node.js に同梱）
- [Docker](https://www.docker.com/) （コンテナ開発を行う場合）

## 開発の進め方

### 1. 依存関係のインストール

```bash
npm ci
```

これにより、すべてのワークスペース（`app/api`、`app/web`、`packages/shared`）の依存関係がインストールされます。

### 2. サービスの起動

**ローカルNode.js** で開発するか、**Docker Compose** で開発するかを選べます。

#### 方法A: ローカル開発（日常的な開発におすすめ）

API と Web を別々のターミナルで起動します。

**ターミナル1 – API:**
```bash
cd app/api
npm run dev
```
- http://localhost:8787 で起動
- リクエストが来るたびにログが自動で出力されます。

**ターミナル2 – Web:**
```bash
cd app/web
npm run dev
```
- http://localhost:5173 で起動
- ホットリロード（HMR）が有効です。

#### 方法B: Docker Compose（統合テストなどにおすすめ）

```bash
docker-compose up --build
```

- フロントエンド（Nginx）: http://localhost:8080
- API: http://localhost:8787

API のログを確認する場合:
```bash
docker-compose logs -f api
```

### 3. 機能追加の流れ

新しい API と UI の機能を追加する際の標準的な流れは以下の通りです:

1. **`packages/shared/src/schemas/` に共有スキーマを追加する**
   - リクエスト・レスポンスの Zod スキーマと TypeScript の型を定義します。
2. **`packages/shared/src/endpoints/` にエンドポイント定義を追加する**
   - メソッド、パス、スキーマを含む型付きエンドポイントオブジェクトをエクスポートします。
3. **`app/api/src/index.ts` に API 処理を実装する**
   - 共有エンドポイントスキーマを使用してリクエストのパース・バリデーションを行います。
   - 新しいルートへのリクエストは自動的にログに出力されます。
4. **`app/web/src/` に UI を実装する**
   - 環境変数 `VITE_API_BASE` を使って API にアクセスします。
   - `shared` から型をインポートして使います。

> **重要:** `shared` はローカルのワークスペースパッケージなので、変更は再インストールなしで API と Web の両方に即座に反映されます。

### 4. 環境変数

| 変数 | 使用箇所 | 説明 |
|---|---|---|
| `PORT` | API | API サーバーのポート番号（デフォルト: `8787`） |
| `CORS_ORIGIN` | API | 許可する CORS オリジン（デフォルト: `http://localhost:5173`） |
| `VITE_API_BASE` | Web | API のベースURL（デフォルト: `http://localhost:8787`） |

### 5. ポート一覧

| サービス | ポート | URL |
|---|---|---|
| API（ローカル） | `8787` | http://localhost:8787 |
| Web（ローカル） | `5173` | http://localhost:5173 |
| API（Docker） | `8787` | http://localhost:8787 |
| Web（Docker） | `8080` | http://localhost:8080 |

## 利用可能なコマンド

### ルート

```bash
npm ci          # すべてのワークスペースの依存関係をインストール
```

### API（`app/api`）

```bash
npm run dev     # tsx で開発サーバーを起動（ホットリロード付き）
npm run start   # 本番モードでサーバーを起動
```

### Web（`app/web`）

```bash
npm run dev     # Vite 開発サーバーを起動
npm run build   # 本番用ビルド
npm run preview # 本番ビルドをローカルでプレビュー
npm run lint    # ESLint を実行
```

### Shared（`packages/shared`）

開発用サーバーはありません。スキーマ・エンドポイントを API や Web に直接インポートして使います。

## CORS 設定

API の CORS オリジンは環境変数 `CORS_ORIGIN` で設定できます。これにより、ローカル環境と Docker 環境の両方で正しく動作します。
