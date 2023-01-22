# j_template_web_frontend_with_npm-scripts

## 目次

- [概要](#概要)
- [推奨環境](#推奨環境)
- [本テンプレートの使い方](#本テンプレートの使い方)
  - [はじめ方](#はじめ方)
  - [本番ファイルの生成方法](#本番ファイルの生成方法)
  - [環境変数](#環境変数)
- [コマンド](#コマンド)
- [ディレクトリ構成](#ディレクトリ構成)
- [Pug](#Pug)
  - [Pugのベースファイル](#Pugのベースファイル)
  - [Pugの変数](#Pugの変数)
  - [Pugにおける環境変数](#Pugにおける環境変数)
  - [HTMLバリデーション](#HTMLバリデーション)
- [Scss](#Scss)
  - [コンパイル対象のscss](#コンパイル対象のscss)
  - [CSS設計](#CSS設計)
  - [よく扱うレイアウト構築方法について](#よく扱うレイアウト構築方法について)
  - [node_modules配下のcss/scss](#node_modules配下のcss/scss)
  - [ベンダープレフィクス](#ベンダープレフィクス)
- [TypeScript](#TypeScript)
  - [コンパイル対象のts](#コンパイル対象のts)
  - [型定義](#型定義)
  - [Webpack](#Webpack)
  - [import文のエイリアス](#import文のエイリアス)
  - [コンパイル&バンドル後のjsのバージョン](#コンパイル&バンドル後のjsのバージョン)
  - [ramda](#ramda)
  - [typedoc](#typedoc)
  - [Utility_Types](#Utility_Types)
- [Storybook](#Storybook)
  - [Storybook](#Storybook)
- [Webフォント](#Webフォント)
  - [実装内容](#実装内容)
  - [Webフォント実装サンプルファイル](#Webフォント実装サンプルファイル)
  - [Webフォント実装の参考記事](#Webフォント実装の参考記事)
- [静的ファイル](#静的ファイル)
- [単体テスト](#単体テスト)
- [cypress導入についての注意点](#cypress導入についての注意点)
- [フロントエンド開発でよく使うコード・ライブラリの実装例](#フロントエンド開発でよく使うコード・ライブラリの実装例)
- [コードフォーマット](#コードフォーマット)

## 概要

npm scripts のみで構成されたフロントエンド開発用テンプレートです。  
静的サイト開発やフロントエンド上の実験・試作品作成を目的としたテンプレートで、シンプルな構成になっています。

主に、以下の技術を使用しています。

- Pug
- Scss（dart sass）
- TypeScript
- Webpack
- Jest

## 推奨環境

|      | バージョン |
| ---- | ---------- |
| node | 16.13.1    |
| yarn | 1.22.17    |
| npm  | 8.3.0      |

**package.json に engines を設定して、Node.js のバージョンに制限をかけています**  
**本テンプレートを利用する場合は、Node.js のバージョンを v16 にあわせる必要があります。**  
**package.json の`"engines": {"node": "16.x"}`の記述を変更・削除することで、バージョン制限の解除が可能です。**

## 本テンプレートの使い方

### はじめ方

1. 環境を[推奨環境](#推奨環境)に合わせます。
2. yarn install（もしくは npm install）を実行します。
3. yarn start（もしくは npm run start）を実行します。
4. 必要に応じて、環境変数ファイル 2 種（.env.development / .env.production ）を用意します  
   詳細は[環境変数](#環境変数)を確認してください
5. ブラウザでローカルサーバーが立ち上がります。  
   a. pug / scss / ts を編集するとホットリロードが走り、ブラウザが更新されます。

### 本番ファイルの生成方法

yarn run build-prod を実行すると、src/ と同階層に dist/ ディレクトリが生成されます。  
その中身が本番用ファイル一式になります。  
（ yarn run build-prod を実行すると、通常の build:\* コマンドではなく、本番ファイル生成用の build-prod:\* コマンドが実行されます。 ）

### 環境変数

本テンプレートの TypeScript では、開発と本番の 2 種の環境変数を扱えるよう設定しています。  
開発用の環境変数はルートディレクトリの .env.development に。本番用の環境変数は .env.production に定義します。  
TypeScript では `process.env.変数名` と記述することで、環境変数を呼び出せます。

上記の機能を実現するために[dotenv-webpack](https://www.npmjs.com/package/dotenv-webpack)を利用しています。  
よりカスタマイズしたい場合は webpack.config.js の plugins を、適宜、調整してください。

**2 種の環境変数ファイル（.env）には、非常に重要な情報を定義する事が考えられるため、リポジトリに含めないよう .gitignore で指定しています。**  
**本テンプレートのセットアップ時に、別途、環境変数ファイル 2 種を用意してください。**  
また、環境変数ファイルを用意せずに、`start` や `build-prod` コマンドを実行した場合、環境変数（`process.env.変数名`）は `undefined` になります。

**※.env ファイルの変数は pug には流し込まれません！ あくまで TypeScript でのみ利用できます。**  
詳細は [Pugにおける環境変数](#Pugにおける環境変数) を確認してください。

## コマンド

本テンプレートで使用できるコマンドは以下の通りです。  
基本的に使用するコマンドは、`start` / `build-prod` のみです。  
（`npm-run-all` を用いて 1 つのコマンドから、複数の npm-script を実行できるようにしています。）  
開発時は `start` 。本番ファイル生成時は `build-prod` を使用します。  
`build-prod` を実行後は、`html-validate` を実行して、HTML バリデーションチェックをする事をオススメします。

| コマンド           | 内容                                                                                                                 |
| ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| start              | clean → 各 build → 各 watch を実行します。<br>開発時は基本的にこのコマンドのみで OK です。                           |
| build              | copy → 各 build コマンド を実行します。                                                                              |
| build-prod         | copy → 各 build コマンド を実行し、本番用ファイルを生成します。<br>pug と webpack は production-build を実行します。 |
| watch              | 各 watch コマンドを実行します。                                                                                      |
| build:pug          | pug をコンパイルします。                                                                                             |
| build-prod:pug     | pug を本番環境モードでコンパイルします。                                                                             |
| watch:pug          | pug を watch しつつ、コンパイルします。                                                                              |
| build:scss         | scss をコンパイルします。                                                                                            |
| build-prod:scss    | scss を本番環境モードでコンパイルします。                                                                            |
| watch:scss         | scss を watch しつつ、コンパイルします。                                                                             |
| build:postcss      | postcss を実行します。                                                                                               |
| build-prod:postcss | postcss を本番環境モードで実行します。                                                                               |
| watch:postcss      | 対象ファイルを watch しつつ、postcss を実行します。                                                                  |
| build:webpack      | typescript を webpack 経由でコンパイル・バンドルします。                                                             |
| build-prod:webpack | typescript を webpack 経由かつ production モードで、コンパイル・バンドルします。                                     |
| watch:webpack      | ts ファイルを watch しつつ、webpack 経由でコンパイル・バンドルします。                                               |
| copy:static        | src/static/ 配下のファイルを、dist/assets/ 配下にコピーします。                                                      |
| serve              | browser-sync を使って、ブラウザを立ち上げます。                                                                      |
| clean              | dist 配下を削除します。                                                                                              |
| test               | jest を実行します。                                                                                                  |
| format             | prettier によるフォーマットを実行します。                                                                            |
| html-validate      | dist/ 配下の html ファイルのバリデーションを実行します                                                               |
| typedoc            | typedoc コマンドを実行して、tsdoc にドキュメントを生成します                                                         |
| clean:cache        | npm キャッシュを削除                                                                                                 |
| storybook          | storybook を起動します                                                                                               |
| build-storybook    | storybook のページを静的サイトとして build します                                                                    |

## ディレクトリ構成

```
.
├── .storybook … storybookの設定ファイルを格納します
├── .env.development … 開発用の環境変数定義ファイル（※.gitignore にて除外）
├── .env.production … 本番用の環境変数定義ファイル（※.gitignore にて除外）
├── .env.sample … 環境変数のサンプルファイル
├── .htmlvalidate.json … html バリデーションの設定ファイル
├── .prettierrc … prettier の設定ファイル
├── dist … 生成物が格納されます
├── tsdoc … typedocドキュメントの生成先
├── README.md
├── jest.config.js … jest の設定ファイルです
├── package.json
├── postcss.config.js
├── src … 開発用ファイル一式を格納します
│   ├── pug … pug ファイルを格納します
│   │   ├── _base
│   │   ├── _parts
│   │   ├── index.pug
│   │   └── sample … サンプルコードを記載
│   ├── scss … scss ファイルを格納します（構成は PRECSS です）
│   │   ├── base
│   │   ├── foundation
│   │   ├── helper
│   │   ├── layout
│   │   ├── module
│   │   ├── program
│   │   ├── style.scss
│   │   └── sample.scss … サンプルコードを記載
│   ├── static … 静的ファイルを格納します
│   │   ├── fonts
│   │   └── images
│   ├── stories … storybookのファイルを格納します
│   └── ts … ts ファイルを格納します
│       ├── @types … 型定義を格納します
│       ├── module … エントリーポイント以外のファイルを格納します
│       ├── main.ts
│       └── sample.ts … サンプルコードを記載
├── tsconfig.json … TypeScript のコンパイル設定ファイルです
├── webpack.config.js … webpack 設定ファイルです
└── yarn.lock
```

## Pug

### Pugのベースファイル

Pug のベースファイル（meta タグ、変数ファイル等…）は、src/pug/\_base/に格納しています。  
各ベースファイルは、src/pug/\_base/\_layout.pug に読み込んで展開されるようになっています。  
また、`block append` で展開しているため、各種変数は上書き可能です。

### Pugの変数

Pug で使用する基本的な変数は、src/pug/\_base/\_variables.pug に記載しています。

### Pugにおける環境変数

Pug 関連のコマンドに `NODE_ENV` オプションを指定しています。  
`build:pug` と `watch:pug` コマンドでは `NODE_ENV=development` 。  
`build-prod:pug` コマンドでは `NODE_ENV=production` となっています。

したがって、  
`start` コマンド実行時は Pug ファイル内では `process.env.NODE_ENV` が `development` として取得できます。  
`build-prod` コマンド実行時は、`process.env.NODE_ENV` が `production` として取得できます。  
上記の環境変数は src/pug/\_base/\_variables.pug にて定義しています。  
必要に応じて、適宜、ご利用ください。

**※環境変数ファイル（.env）の値は、pug ファイルには流し込まれません！**  
**環境に応じて、pug 内の変数を切り替える場合、src/pug/\_base/\_variables.pug にて再定義してください！**

### HTMLバリデーション

html-validate コマンドを実行することで、dist/ 配下の全 html ファイルを対象にバリエーションチェックを実行します。
HTML バリデーションには [HTML-validate cli](https://html-validate.org/usage/cli.html) を利用しています。

また、バリデーションの設定は、ルートディレクトリ直下の .htmlvalidate.json に記述しています。  
設定を更新する場合は、公式サイトを参照してください。

## Scss

### コンパイル対象のscss

src/scss/ 直下の scss ファイルがコンパイル対象になります。  
これらのファイルはコンパイル後に、dist/assets/css/ に出力されます。

### CSS設計

本テンプレートでは[PRECSS](https://precss.io/ja/)を採用しています。  
scss/ 配下のディレクトリ構成も[PRECSS](https://precss.io/ja/)に準拠したものになっています。

BEM や FLOCSS を使用したい場合は、適宜修正を加えてください。

### よく扱うレイアウト構築方法について

よく扱うレイアウト構築手法として、Flex box と Grid Layout のサンプルコードを`/src/scss/sample.scss`に実装しています。  
個人的に、ページ全体のレイアウトは Grid Layout で構築。列などの細かい要素は Flex box で構築していく事をオススメします。

参考リンク

- [> CSS Flexbox 各プロパティの使い方を詳しく解説 | coliss](https://coliss.com/articles/build-websites/operation/css/css3-flexbox-properties-by-scotch.html)
- [> Grid Layout | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/grid-template)
- [> Column | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/columns)

### node_modules配下のcss/scss

@use 文で node_modules 配下の scss/css を読み込む際は、相対パスで記述する必要があります。
`/src/scss/sample.scss`にサンプルコードを実装しています。

### ベンダープレフィクス

本テンプレートでは、postcss・autoprefixer を使って、CSS プロパティにベンダープレフィクスが適用されるようにしています。  
対象ブラウザは package.json の browserslist に記載しています。  
適宜カスタマイズしてください。

## TypeScript

### コンパイル対象のts

src/ts/ 直下の ts ファイルがコンパイル対象になります。  
これらのファイルはコンパイル後に、dist/assets/js/ に出力されます。

コンパイル対象の ts ファイルを追加する場合は、以下の作業を行ってください。

1. src/ts/ 直下に ts ファイルを追加する
2. webpack.config.js の entry にファイルを追記する

### JavaScriptファイルの除外

本テンプレートでは、品質向上のため JavaScript ファイルでの実装を許可していません。  
要件により、JavaScript ファイルでの実装が必要になった場合は、tsconfig.json に `"allowJs": true` を追記してください。

### 型定義

src/ts/ 直下に @types ディレクトリを用意しています。  
TypeScript で利用する型定義は、このディレクトリに集約することを推奨します。  
また、後述するアンビエント宣言の型定義ファイル(.d.ts)を利用しない場合は、@types から types に名称を変更した方が良いでしょう。

#### アンビエント宣言の型定義ファイル

アンビエント宣言（`declare`）とは、JavaScript で記述されたライブラリに型情報を付加するための機能です。  
主に、型定義のないライブラリのために、型を自作する時に用いられます。

アンビエント宣言は TypeScript コーディングの慣例に従い、通常の ts ファイルと同居させずに、d.ts として定義した上で、src/ts/@types に格納してください。  
アンビエント宣言のサンプルとして、src/ts/@types/image.d.ts を用意しています。

参考リンク

- [アンビエント宣言(declare)](https://typescript-jp.gitbook.io/deep-dive/type-system/intro)
- [型定義ファイル](https://typescript-jp.gitbook.io/deep-dive/type-system/intro/d.ts)

### Webpack

本テンプレートでは、Webpack を使って TypeScript のコンパイルおよびバンドルを行っています。  
Webpack は基本的な項目しか設定していません。  
React や Vue 等を導入したい場合は、適宜カスタマイズしてください。

### import文のエイリアス

本テンプレートでは、import 文でエイリアスを利用できるようにしています。  
`import XX from '@/~'`と記載することで、src/ts/配下へのエイリアスを設定できます。

エイリアス設定は以下のファイルで適用しています。

- tsconfig.json
  - `baseUrl` / `paths` … TypeScript のコンパイル・型チェックで利用する
- webpack.config.js
  - `resolve.alias` … バンドルする際のエイリアスとして利用する
- jest.config.js
  - `moduleNameMapper` … テストファイルでもエイリアスを利用できるようにする

### コンパイル&バンドル後のjsのバージョン

TypeScript のコンパイル&バンドル後の js のバージョンは、package.json の browserslist に記載されている通りです。  
（ webpack.config.js の target で browserslist と指定しているため、package.json の browserslist が適用されます。）

### ramda

本テンプレートでは [ramda](https://ramdajs.com/) を採用しています。  
[ramda](https://ramdajs.com/) は JavaScript / TypeScript のユーティリティライブラリです。  
[R.clone](https://ramdajs.com/docs/#clone) ：ディープコピー、[R.equals](https://ramdajs.com/docs/#equals) ：ディープイコール…などの便利なメソッドが用意されています。  
また、特に JavaScript / TypeScript で関数型プログラミングを実現するのに役立ちます。

`import * as R from 'ramda'` もしくは `import { …必要な機能のみ…, } from 'ramda'` で .ts ファイルに読み込んで使用できます。  
[@types/ramda](https://www.npmjs.com/package/@types/ramda) もインストールしていますので、型安全になっています。

以下に ramda のサンプルファイルを格納しています。

- /src/ts/modules/ramdaSample/ramdaSample.ts
- /src/ts/modules/ramdaSample/ramdaSample.test.ts

ramda が不要な場合はサンプルファイルを削除した上で、下記のコマンドを実行すれば、テンプレートから削除できます。  
`yarn remove ramda @types/ramda` もしくは `npm uninstall ramda @types/ramda`

### typedoc

本テンプレートでは、[typedoc](https://typedoc.org/guides/overview/)を導入しています。  
`yarn typedoc` もしくは `npn run typedoc` を実行すると、tsdoc/ 配下に TypeScript のドキュメントファイルを生成します。  
ドキュメントの生成対象は `src/ts` 配下の ts ファイルです。（※d.ts は除外しています。）

生成されるドキュメントは各.ts ファイルの JSDoc/TSDoc を元に生成されます。また、ドキュメント生成と同時に tsc コマンドによる型精査も行われた上でドキュメントに反映されます。  
したがって、JSDoc/TSDoc のコメントに誤りがあっても、ある程度の補完が効きます。

大規模プロジェクトを構築する場合は、.ts ファイルに、JSDoc/TSDoc コメントを記載し、適宜ドキュメントを生成することをオススメします。

参考リンク

- [> TypeDoc](https://typedoc.org/guides/overview/)

#### typedocの設定

typedoc の設定は、すべてコマンド実行時のオプションで指定しています。  
現状では設定しているオプションは下記の通りです。

- `--readme none`: tsdoc/配下に readme.md を出力しない
- `--cleanOutputDir true`: ドキュメント生成時に、前回出力のドキュメント一式を削除する
- `--excludeExternals false`: 外部ファイルの ts のドキュメントを生成しない。対象ファイルのみ生成する
- `--exclude '**/*+(.test|.spec|.e2e)*+(.ts|.js)'`: ドキュメント生成対象の除外を指定。テストファイルはドキュメントを生成しない
- `--entryPointStrategy expand`: .ts ファイルごとにページを生成する
- `--out ./tsdoc/ ./src/ts/`: ドキュメント生成先と、対象の.ts ファイルの格納先を指定

### Utility_Types

よく利用する TypeScript の Utility Types のサンプルコードを以下に格納しています。

- src/ts/@types/sampleUtilityTypes.ts

参考リンク

- [> Utility Types | TypeScript](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [> ユーティリティ型 (utility type) | サバイバル TypeScript](https://typescriptbook.jp/reference/type-reuse/utility-types)

## Storybook

本テンプレートには[Storybook](https://storybook.js.org/)を導入しています。  
`yarn storybook` もしくは `npm run storybook` コマンドを実行すると storybook ページが立ち上がります。

### Storybookのコマンド

| コマンド             | 内容                               |
| -------------------- | ---------------------------------- |
| yarn storybook       | storybook を立ち上げます           |
| yarn build-storybook | storybook の静的ページを生成します |

### Storybookのサンプルファイル

storybook のサンプルファイルとして、`.el_btn` クラスのファイルを用意しています。  
該当のファイルは下記の 2 点です。

- `/src/stories/Btn/Btn.ts`
  - storybook で表示する UI を生成する ts ファイルです。  
    表示したい UI の HTMLElement を生成するコードを実装して、XX.stories.ts へ読み込ませます。
- `/src/stories/Btn/Btn.stories.ts`
  - storybook のエントリーポイントとなるファイルです。

## Webフォント

本テンプレートでは、[Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP)を`.woff2`、`.woff`形式で読み込んで、font-family として適用するサンプルを実装しています。

### 実装内容

基本的に[Noto Sans JP を使うための手順](https://gist.github.com/manabuyasuda/b5c867a7cbd17d1eb905b3a8cfd621a6)に記載してある内容に沿って実装しています。

1. Web フォントとして実装するフォントファイルを用意します
2. [サブセットフォントメーカー](https://opentype.jp/subsetfontmk.htm)を利用して、サブセット化します
   - 詳細項目は[2. サブセット化する](https://gist.github.com/manabuyasuda/b5c867a7cbd17d1eb905b3a8cfd621a6#2-%E3%82%B5%E3%83%96%E3%82%BB%E3%83%83%E3%83%88%E5%8C%96%E3%81%99%E3%82%8B)を確認してください
3. [WOFF コンバータ](https://opentype.jp/woffconv.htm)を利用して、`.woff2` / `.woff`を生成します
   - 詳細項目は[3. woff 形式のフォントファイルに変換する](https://gist.github.com/manabuyasuda/b5c867a7cbd17d1eb905b3a8cfd621a6#3-woff%E5%BD%A2%E5%BC%8F%E3%81%AE%E3%83%95%E3%82%A9%E3%83%B3%E3%83%88%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AB%E5%A4%89%E6%8F%9B%E3%81%99%E3%82%8B)を確認してください
4. 3.で生成した`.woff2` / `.woff`を静的ファイル格納先へコピペします
5. SCSS/CSS でフォントを指定します
   - 実装サンプルファイルは、[Web フォント実装サンプルファイル](#Webフォント実装サンプルファイル)に記載した通りです。

### Webフォント実装サンプルファイル

Web フォント実装サンプルの関連ファイルは以下の通りです。

```
./
└── src
    ├── pug
    │   └── sample
    │       └── index.pug … Webフォント展開先
    ├── scss
    │   ├── base
    │   ├── foundation
    │   │   ├── mixin
    │   │   │   └── _set-font-face.scss … @font-face展開用mixinを定義
    │   │   └── variable
    │   │       └── _font.scss … font-familyの変数を定義
    │   └── sample.scss … @font-face展開用mixinの利用サンプル・font-family適用CSSを記述
    └── static
        └── fonts … .woff2 / .woffファイルを格納
```

### Webフォント実装の参考記事

- [> Noto Sans JP を使うための手順](https://gist.github.com/manabuyasuda/b5c867a7cbd17d1eb905b3a8cfd621a6)
- [> A mixin for writing @font-face rules in SASS.](https://gist.github.com/jonathantneal/d0460e5c2d5d7f9bc5e6)

## 静的ファイル

本テンプレートでは、静的ファイルは src/static/ 配下に格納してください。  
src/static/ 配下のファイルは copy コマンドによって、dist/assets/ 配下にディレクトリごとコピーされます。

## 単体テスト

本テンプレートでは、jest を導入しています。  
jest の型定義も導入していますので、TypeScript でテストファイルを作成・実行できます。

テストファイルの格納先の指定はありませんが、src/ts/modules/paddingZero/ と同じように、処理の本体.ts と同階層に test.ts を格納することをおすすめします。

また、結合テストの仕組みは導入していませんので、必要に応じて導入とカスタマイズをしてください。

## フロントエンド開発でよく使うコード・ライブラリの実装例

本テンプレートでは、フロントエンド開発においてよく使う汎用コード・ライブラリのサンプルを実装しています。  
実装しているコードは以下の通りです。  
構築において不要になる場合は、適宜テンプレートから削除してください。

- TypeScript Utility Types
  - サンプル: `/src/ts/@types/sampleUtilityTypes.ts`
- スライダー・カルーセル: [keen-slider](https://keen-slider.io/)
  - サンプル: `/src/ts/modules/createKeenSlider/createKeenSlider.ts`
- Canvas: [PixiJS](https://pixijs.com/)
  - サンプル: `/src/ts/modules/createPixi/createPixi.ts`
- グラフ描画: [D3.js](https://d3js.org/)
  - サンプル: `/src/ts/modules/createSampleD3/createSampleD3.ts`
- アニメーション: GSAP
  - サンプル: `/src/ts/sample.ts`（Intersection Observer の callback 内の処理）
- Fetch
  - サンプル: `/src/ts/modules/createFetch/createFetch.ts`
- XMLHttpRequests: [Aioxs](https://axios-http.com/)
  - サンプル: `/src/ts/modules/createAxios/createAxios.ts`
- リサイズイベント
  - サンプル: `/src/ts/modules/setResizeEvent/setResizeEvent.ts`
- MediaQueryList オブジェクトを利用したメディアクエリマッチ
  - サンプル: `/src/ts/modules/matchMedia/matchMedia.ts`
- 画面縦幅 100vh 表示
  - サンプル: `/src/ts/sample.ts`
  - 参考: [iOS でも 100vh をいい具合に調整して画面の高さいっぱいに要素を表示させる](https://zenn.dev/tak_dcxi/articles/2ac77656aa94c2cd40bf)
- スクロールトリガー（Intersection Observer）
  - サンプル: `/src/ts/modules/createIntersectionObserver/createIntersectionObserver.ts`
- 定期実行（ルーチン処理）
  - サンプル: `/src/ts/modules/setRoutine/setRoutine.ts`
- Rust の Result 型を、Map を用いて擬似的に再現
  - サンプル: `/src/ts/modules/createResultMap/createResultMap.ts`
- Intl.Segmenter（※2022.09 時点で FireFox は未サポート）を利用した文字列カウント関数
  - サンプル: `/src/ts/modules/countStr/countStr.ts`
- ユーザーエージェント判定用の関数
  - サンプル: `/src/ts/modules/getUA/getUA.ts`
- デバイスがタッチ可能かを判定する関数
  - サンプル: `/src/ts/modules/getIsTouchableDevice/getIsTouchableDevice.ts`
- バリデーション: zod
  - サンプル: `/src/ts/modules/zodValidation/zodValidation.ts`
- 「XX 要素以外をクリックした時」のイベントをセットする関数
  - サンプル: `/src/ts/modules/setCustomClick/setCustomClick.ts`
- スクロール禁止
  - サンプル: `/src/ts/samples/setStopScrollHandler/setStopScrollHandler.ts`
- マウスストーカー
  - サンプル: `/src/ts/samples/setMouseStalker/setMouseStalker.ts`
  - サンプル: `/src/scss/program/_mouseStalker.scss`

サンプルコードは、主に下記のファイルをエントリーポイントとして実装しています

- pug: `src/pug/sample/index.pug`
- scss: `src/scss/sample.scss`
- ts: `src/ts/sample.ts`

## cypress 導入の注意点

e2e テストとして cypress を導入する場合、jest の型と競合が発生する場合があります。  
この現象は各 jest ファイル (`**/*.test.ts`) に `import { expect } from '@jest/globals'` を記載することで回避可能です。

[> cypress-io/cypress-and-jest-typescript-example](https://github.com/cypress-io/cypress-and-jest-typescript-example)

## コードフォーマット

本テンプレートでは、[prettier](https://prettier.io/) を導入しています。  
`npm format` もしくは `yarn format` を実行すると、src ディレクトリ配下の js, ts, json, scss ファイルすべてが整形されます。
