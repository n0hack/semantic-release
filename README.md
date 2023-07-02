<!-- BACK TO TOP LINK -->

<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![Forks][Forks Shield]][Forks URL]
[![Stargazer][Stars Shield]][Stars URL]
[![MIT License][License Shield]][License URL]

# semantic-release

semantic-release는 버전 관리를 자동화할 수 있도록 도움을 주는 라이브러리입니다. 이를 사용하면 커밋 타입이나 메시지 내용에 따라 프로젝트 버전을 증가시킬 수도 있고, Release 노트 작성을 자동화할 수도 있습니다. 저는 회사 프로젝트에 적용해 봤는데 🐶 만족 중입니다.

### 워크플로우

- 하위 브랜치에서 작업 후 변경사항을 커밋합니다.
  - semantic-release의 커밋 규칙은 [conventional commits](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)를 따릅니다.
- 기능 구현이 완료되었다면, main 브랜치에 병합합니다.
- 커밋 타입 또는 메시지 내용에 따라 버전이 관리되고, 릴리즈 노트가 자동으로 작성됩니다.
  - 커밋 메시지 내용에 `breaking change`가 포함되어 있다면, `major` 버전이 증가합니다.
  - 커밋 타입이 `feat`로 시작한다면, `minor` 버전이 증가합니다.
  - 커밋 타입이 `fix` 또는 `perf`로 시작한다면, `patch` 버전이 증가합니다.

> 버전은 시맨틱 버저닝(major.minor.patch)을 따르고 있으며, 앞의 규칙부터 버전 관리 시 우선 적용됩니다.
> 병합 하기 전의 커밋 내역에 feat와 fix가 모두 있다면, minor 버전만 증가하는 식입니다.

### 설치

```bash
$ yarn add -D semantic-release @semantic-release/changelog @semantic-release/git
```

### 설정

루트 경로에 `release.config.js` 또는 `.releaserc` 파일을 생성하세요.

```javascript
/**
 * Semantic Release
 * - Commit 타입에 따라 릴리즈 노트를 작성해 주는 패키지입니다.
 * - https://github.com/semantic-release/semantic-release
 */
const config = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/github',
      {
        successComment: false,
        failTitle: false,
      },
    ],
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/git',
      {
        message: 'chore(release): v${nextRelease.version}\n\n${nextRelease.notes}',
      },
    ],
  ],
};

module.exports = config;
```

앞서 설치하지 않은 플러그인이 일부 추가된 것을 볼 수 있는데, 이들은 semantic-release에 기본적으로 내장된 플러그인입니다. 각각 역할이 다르니 이는 공식문서에서 확인해 주세요. 그리고 semantic-release는 동작 순서가 있으며, 각 플러그인이 의존하는 순서가 있기 때문에 포함되는 순서를 신경 써야 합니다.

### GitHub Action CI/CD 구성

`/.github/workflows` 경로 안에 `.yml` 파일을 생성하세요.

```yml
name: Release New Version
on:
  push:
    branches:
      - main
jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    permissions:
      contents: write
      issues: write
      pull-requests: write
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 'lts/*'
      - name: Install dependencies
        run: rm -rf node_modules && yarn install --frozen-lockfile
      # - name: Build application
      #   run: yarn build
      - name: Run semantic-release
        run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

main 브랜치에 병합될 때만 Action이 동작하도록 작성했습니다. 리액트와 같은 프로젝트를 진행하고 계시다면, 주석 처리된 부분을 해제하여, 빌드도 진행하시면 좋습니다. 만약 빌드가 제대로 되지 않는 경우, release 또한 완료되지 않기에 버전 관리를 안전하게 진행할 수 있습니다.

<br />

# cz-customizable

cz-customizable은 커밋 규칙을 강제하기 위해 도입한 패키지입니다. 팀 내에서 규칙을 정했다 해도, 항상 매뉴얼로 작성하다 보면 헷갈릴 때가 있습니다. 이 경우 사용하면 좋을 거 같아 적용했는데, semantic-release와 함께 사용할 때 경험이 꽤 좋았습니다.

### 설치

```bash
$ yarn add -D cz-customizable
```

### 설정

루트 경로에 `cz-config.js` 파일을 생성하세요.

```javascript
module.exports = {
  types: [
    { value: 'feat', name: 'feat: 새로운 기능 추가' },
    { value: 'fix', name: 'fix: 잘못된 동작이나 버그 수정' },
    { value: 'perf', name: 'perf: 성능 개선' },
    { value: 'refactor', name: 'refactor: 코드 리팩토링' },
    { value: 'revert', name: 'revert: 이전의 코드로 되돌림' },
    { value: 'style', name: 'style: 포맷팅이나 컨벤션에 따른 수정 사항 반영' },
    { value: 'test', name: 'test: 테스트 코드 추가 & 리팩토링' },
    { value: 'build', name: 'build: 빌드 관련 코드 추가 & 수정' },
    { value: 'ci', name: 'ci: CI 업데이트' },
    { value: 'docs', name: 'docs: 문서 작성 & 수정' },
    { value: 'chore', name: 'chore: 사소한 변경이나 패키지매니저 관리' },
  ],
  scopes: [
    'component',
    'css-style',
    'custom-hook',
    'store',
    'util',
    'api',
    'assets',
    'package',
    'lint',
    'formatting',
    'config',
    'workflow',
    'README',
  ],
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  messages: {
    type: '✨ Commit 타입 선택:',
    scope: '✨ Commit 범위 선택 (선택사항):',
    customScope: '✨ Custom 범위 작성:\n',
    subject: '✨ Commit 제목 작성:\n',
    body: '✨ Commit 내용 작성 (선택사항) ["|" 사용 시 개행 처리]:\n',
    breaking: '✨ BREAKING CHANGES 사항 나열 (선택사항):\n',
    footer: '✨ 이 변경으로 끝난 이슈 나열 (선택사항). E.g.: #31, #34:\n',
    confirmCommit: '✨ 작성한 내용으로 커밋을 진행하겠습니까?',
  },
  skipQuestions: ['body'],
  subjectLimit: 100,
};
```

`package.json`에 스크립트와 설정을 추가하세요.

```json
{
  ...
  "scripts": {
    "commit": "./node_modules/cz-customizable/standalone.js"
  },
  "config": {
    "cz-customizable": {
      "config": "cz-config.js"
    }
  },
  ...
}
```

변경사항을 Stage에 추가한 후, `yarn commit` 명령으로 실행하면 됩니다.

![Jun-26-2023 21-44-20](https://github.com/n0hack/semantic-release/assets/42988225/6676aac1-9eb7-4645-80fb-2ca0dd508381)

<p align="right">
  <a href="#readme-top">back to top</a>
</p>

<!-- MARKDOWN LINKS & IMAGES -->

[Forks Shield]: https://img.shields.io/github/forks/n0hack/semantic-release?style=for-the-badge
[Forks URL]: https://github.com/n0hack/semantic-release/network/members
[Stars Shield]: https://img.shields.io/github/stars/n0hack/semantic-release?style=for-the-badge
[Stars URL]: https://github.com/n0hack/semantic-release/stargazers
[License Shield]: https://img.shields.io/github/license/n0hack/semantic-release?style=for-the-badge
[License URL]: https://github.com/n0hack/semantic-release/blob/main/LICENSE
