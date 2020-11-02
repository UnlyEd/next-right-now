module.exports = {
  presets: [
    ['next/babel', { 'preset-react': { importSource: '@emotion/core' } }],
  ],
  plugins: ['emotion'],
};
