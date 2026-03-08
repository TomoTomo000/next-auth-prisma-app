# 🔐 NextAuth × Prisma App 🚀

Next.js 14（App Router）と NextAuth.js v5、Prisma を使用した  
認証機能付きサンプルアプリケーションです。

Supabase（PostgreSQL）をデータベースとして利用し、  
Credentials Provider を使ったメール＋パスワード認証を実装しています。

---

## 🧰 技術スタック

- Next.js 14 (App Router)
- NextAuth.js v5
- Prisma ORM
- Supabase（PostgreSQL）
- TypeScript
- Tailwind CSS
- Zod（バリデーション）
- bcrypt（パスワードハッシュ化）

---

## ✨ 実装機能

- 新規会員登録（サインアップ）
- ログイン / ログアウト
- セッション管理（Server / Client 両対応）
- パスワードのハッシュ化（bcrypt）
- 入力バリデーション（Zod）
- Snackbar による通知表示
- 登録解除（ユーザー削除）※今後実装予定

---

## 📁 ディレクトリ構成（抜粋）
.  
├─ app/  
│ ├─ (auth)/ ログイン・サインアップ関連ページ  
│ ├─ api/auth/ NextAuth handler  
│ └─ page.tsx  
├─ components/  
│ └─ auth/ LoginForm / LogoutButton など  
├─ lib/  
│ ├─ auth/ schema / action / repo  
│ └─ prisma.ts  
├─ prisma/  
│ └─ schema.prisma  
├─ auth.ts NextAuth 設定  
├─ auth.config.ts  
└─ README.md  

---
  
## 🗄 データベースについて

本アプリは **Supabase（PostgreSQL）** を使用しています。

事前に Supabase でプロジェクトを作成し、  
接続用の `DATABASE_URL` を取得してください。

Supabase ダッシュボード  
`Project Settings → Database → Connection string`

---

## 🚀 セットアップ手順

### 1️⃣ リポジトリをクローン

```bash
git clone https://github.com/TomoTomo000/next-auth-prisma-app.git
cd next-auth-prisma-app
```

### 2️⃣ パッケージをインストール
```bash
npm install
```

### 3️⃣ 環境変数を設定
.env を作成し、以下を設定してください。

例：）
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

NEXT_PUBLIC_APP_ENV=stg
NEXT_PUBLIC_BASIC_AUTH_ENABLED=true

BASIC_AUTH_USER=admin
BASIC_AUTH_PASS=secret

### 4️⃣ Prisma マイグレーション
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5️⃣ 開発サーバー起動
```bash
npm run dev
```
