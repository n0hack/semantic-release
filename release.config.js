const config = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer', // already part of semantic-release
    '@semantic-release/release-notes-generator', // already part of semantic-release
    [
      '@semantic-release/github',
      // https://github.com/semantic-release/semantic-release/issues/2204#issuecomment-1486299917
      {
        successComment: false,
        failTitle: false,
      },
    ], // already part of semantic-release
    // to change version on package.json
    ['@semantic-release/npm', { npmPublish: false }], // already part of semantic-release
    '@semantic-release/changelog',
    [
      '@semantic-release/git',
      {
        message:
          // eslint-disable-next-line no-template-curly-in-string
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};

module.exports = config;
