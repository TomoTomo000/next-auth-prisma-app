NextAuth × Prisma App🚀

Next.js 14（App Router）と NextAuth.js v5、Prisma を使った
認証機能付きサンプルアプリケーションです。
メール＋パスワードによるログインに加え、
NextAuth の Credentials Provider を利用した独自認証フローを実装しています。

技術スタック

Next.js 14 (App Router)
NextAuth.js v5
Prisma ORM
SQLite
TypeScript
Tailwind CSS
Zod（バリデーション）

実装機能
新規会員登録（サインアップ）
ログイン / ログアウト
セッション管理（Server / Client 両対応）
パスワードのハッシュ化（bcrypt）
入力バリデーション（Zod）
Snackbar による通知表示
登録解除（ユーザー削除）※今後実装予定

ディレクトリ構成（抜粋）
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

セットアップ手順

リポジトリをクローン

git clone https://github.com/TomoTomo000/next-auth-prisma-app.git

cd next-auth-prisma-app

パッケージをインストール

npm install

環境変数を設定

.env ファイルを作成し、以下を設定してください。

DATABASE_URL="file:./dev.db"
AUTH_SECRET=your-secret

Prisma マイグレーション

npx prisma migrate dev

開発サーバー起動

npm run dev