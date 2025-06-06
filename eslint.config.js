// eslint.config.js
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import htmlPlugin from 'eslint-plugin-html';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default defineConfig([
  // 기본 설정
  js.configs.recommended,

  // TypeScript 설정
  ...tseslint.configs.recommended,

  // 기본 환경 설정
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        browser: true,
        commonjs: true,
        node: true,
        es2021: true,
      },
    },
  },

  // 플러그인 설정
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      html: htmlPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
  },

  // React 설정
  {
    settings: {
      react: {
        version: 'detect', // React 버전을 자동으로 감지
      },
    },
  },

  // 모든 파일에 적용되는 규칙
  {
    files: [ '**/*.{js,jsx,ts,tsx}', ],
    rules: {

      // 일반 규칙
      indent: [ 'warn', 2, { SwitchCase: 1, }, ],
      'no-console': 'off',
      'no-unused-vars': 'off',
      'no-unexpected-multiline': 'off',
      'no-use-before-define': 'off',
      'spaced-comment': 'off',
      'function-call-argument-newline': [ 'error', 'consistent', ],
      'function-paren-newline': [ 'error', 'multiline', ],
      'no-multiple-empty-lines': [ 'error', { max: 1, maxBOF: 0, maxEOF: 0, }, ],
      'no-multi-spaces': [ 'error', ],
      'no-irregular-whitespace': 'error',
      'no-param-reassign': 'off',
      'eol-last': [ 'warn', 'always', ],
      'no-plusplus': 'off',
      'no-restricted-syntax': 'off',
      'array-callback-return': 'off',
      'consistent-return': 'off',
      'no-nested-ternary': 'off',
      quotes: [ 'warn', 'single', { allowTemplateLiterals: true, }, ],
      semi: [ 'error', 'always', ],
      'array-bracket-spacing': [
        'warn',
        'always',
        {
          arraysInArrays: true,
          singleValue: true,
          objectsInArrays: true,
        },
      ],
      'object-curly-spacing': [ 'warn', 'always', ],
      'no-shadow': 'off',
      'comma-dangle': [
        'warn',
        {
          arrays: 'always',
          functions: 'never',
          objects: 'always',
          imports: 'never',
          exports: 'never',
        },
      ],
      'jsx-quotes': [ 'error', 'prefer-single', ],
      'linebreak-style': 'off',
      'prefer-const': 'off',
      'max-len': 'off',
      'no-else-return': 'off',
      'no-lonely-if': 'off',
      'global-require': 'off',
      'class-methods-use-this': 'off',
      'no-useless-constructor': 'off',
      'no-useless-return': 'off',
      'lines-between-class-members': 'off',
      'arrow-body-style': 'off',
      'no-empty-function': 'off',
      camelcase: 'off',
      'no-empty-pattern': 'off',
      'no-underscore-dangle': 'off',

      // 임포트 규칙
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-unresolved': 'off',
      'import/no-dynamic-require': 'off',
      'import/prefer-default-export': 'off',
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true, },
        },
      ],

      // 타입스크립트 규칙
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: false, classes: true, variables: true, },
      ],

      // 리액트 규칙
      'react/jsx-indent': [ 'warn', 2, ],
      'react/jsx-curly-spacing': [ 'error', { when: 'never', children: true, }, ],
      'react/jsx-props-no-spreading': 'off',
      'react/forbid-prop-types': 'off',
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: [ 'js', 'jsx', '.ts', '.tsx', ],
        },
      ],
      'react/no-danger': 'off',
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never', },
      ],
      'react/require-default-props': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-no-useless-fragment': 'off',
      'react/no-arrow-function-lifecycle': 'off',
      'react/no-invalid-html-attribute': 'off',
      'react/no-unused-class-component-methods': 'off',
      'react/button-has-type': 'off',
      'react/no-unknown-property': [
        'error',
        {
          ignore: [ 'css', 'tw', 'jsx', 'global', ],
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // 리액트 훅스 규칙
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',

      // 접근성 규칙
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: [ 'Link', ],
          specialLink: [ 'hrefLeft', 'hrefRight', ],
          aspects: [ 'invalidHref', 'preferButton', ],
        },
      ],
      'jsx-a11y/anchor-has-content': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
    },
  },

  // Next.js 특화 규칙
  {
    files: [ 'app/**/*.{js,jsx,ts,tsx}', ],
    rules: {
      'import/no-default-export': 'off',
      'react/function-component-definition': 'off',
    },
  },

  // 테스트 파일 규칙
  {
    files: [ '**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}', ],
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]);
