module.exports = {
  types: [
    { value: 'feat', name: 'Feat: 기능을 추가해요.' },
    { value: 'fix', name: 'Fix: 버그를 수정해요.' },
    { value: 'perf', name: 'Perf: 성능을 개선해요.' },
    { value: 'refactor', name: 'Refactor: 코드를 리팩토링해요.' },
    { value: 'style', name: 'Style: 포맷팅이나 컨벤션에 따라 수정 사항을 반영해요.' },
    { value: 'docs', name: 'Docs: 문서의 내용을 일부 변경해요.' },
    { value: 'test', name: 'Test: 테스트 코드를 추가하거나 리팩토링해요.' },
    { value: 'chore', name: 'Chore: 사소한 변경사항이나, 패키지매니저를 관리해요.' },
    { value: 'revert', name: 'Revert: 이전의 코드로 되돌려요.' },
    { value: 'move', name: 'Move: 디렉토리, 파일이나 코드를 새로운 위치로 이동시켜요.' },
    { value: 'remove', name: 'Remove: 쓸모없는 디렉토리, 파일이나 코드를 삭제해요.' },
    { value: 'ci', name: 'CI: CI를 업데이트해요.' },
  ],
  scopes: [
    'component',
    'css-style',
    'custom-hook',
    'store',
    'util',
    'api',
    'wrong codes',
    'spaghetti codes',
    'alien codes',
    'assets',
    'package',
    'lint',
    'formatting',
    'config',
    'workflow',
    'breaking',
    'no-release',
    'README',
  ],
  allowCustomScopes: true,
};

// build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
// ci: Changes to our CI configuration files and scripts (examples: CircleCi, SauceLabs)
// docs: Documentation only changes
// feat: A new feature
// fix: A bug fix
// perf: A code change that improves performance
// refactor: A code change that neither fixes a bug nor adds a feature
// test: Adding missing tests or correcting existing tests
