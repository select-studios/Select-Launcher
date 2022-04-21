/* eslint global-require: off, import/no-extraneous-dependencies: off */

module.exports = {
  purge: {
    enabled: true,
    content: ['./src/*/.tsx'],
  },
  theme: {},
  variants: {},
  plugins: [require('daisyui')],
};
