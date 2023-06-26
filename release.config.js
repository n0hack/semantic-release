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
