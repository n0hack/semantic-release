/**
 * Semantic Release (https://github.com/semantic-release/semantic-release)
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
        message: '📦️ chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};

module.exports = config;
