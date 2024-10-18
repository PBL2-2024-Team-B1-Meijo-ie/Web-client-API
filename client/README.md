# 概要
Webクライアントサイドのアプリを開発する部分
React + TypeScript + Viteで構築
リンターはESLintを使用
フォーマッターはBiomeを使用

# 環境構築
1. 作業ディレクトリを移動
   1. `cd client` コマンドを実行
2. Node.jsのインストール
   1. nvmやnodebrewを使用してNode.jsをインストール
      1. nvm(特にWindowsの場合)
         1. [nvm-windows](https://github.com/coreybutler/nvm-windows)を使用
         2. [Microsoftのnvmインストールガイド](https://learn.microsoft.com/ja-jp/windows/dev-environment/javascript/nodejs-on-windows)
      2. node v22.9.0, npm v10.8.3で動作確認済み
   2. `../web-client-api/client`ディレクトリで`npm install`を実行
   3. `npm run dev`でクライアントサイドのアプリが起動するはず
   4. 困ったら聞いて





# ここより下はViteにより作成されたテンプレ
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
