# Next.js トレーニング

Next.js をトレーニングするためのリポジトリです。

## App URL

https://templatenextjs.web.app/

## 利用技術

- Next.js
- ホスティング：Firebase
- Material-ui / Material-ui-icons

Next.js は Redux 付き

```bash
create-next-app --example with-redux my-app
```

## How to use

```bash
npn install
# or
yarn add
```

## CRUD

プロジェクトルートに`.env`を作成して Firebase の設定が必要です。

```javascript
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_DATABASE_URL=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""
```

## アニメーション

```bash
npm i react-genie-styled-components
```

スクロールに応じてもわっと表示させるために使います。

## 課題

- ホスティング環境でレンダリング直後に一瞬前面にどでかいアイコンが表示される。
- CRUD の Firebase の Storage に登録する処理に`react-firebase-file-uploader`を使おうとしているが`npm run build`では成功するものの`npm run build`で失敗してしまう。
- fetch には[SWR](https://nextjs.org/docs/basic-features/data-fetching)を使うとよさそう。
