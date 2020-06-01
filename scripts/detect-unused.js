const madge = require('madge');
const path = require('path');

/**
 * Inspired by https://github.com/vercel/next.js/discussions/10655
 * @see https://github.com/pahen/madge
 */
function pruneTree(subtree, tree) {
  if (!subtree || subtree.length === 0) {
    return;
  }
  for (let child of subtree) {
    const nextSubtree = tree[child];
    if (tree[child]) {
      delete tree[child];
    }
    pruneTree(nextSubtree, tree);
  }
}

madge(path.join(__dirname, '..'), {
  baseDir: path.join(__dirname, '..'),
  fileExtensions: ['ts', 'tsx'],
  // detectiveOptions: {
  //   ts: {
  //     skipTypeImports: true,
  //   },
  // },
  webpackConfig: 'next.config.js',
  tsConfig: 'tsconfig.json',
  excludeRegExp: [
    /^\.next[\\/]/, // Ignore built artifacts
    /^jest\.config\.js/, // Ignore Next.js configuration
    /^next\.config\.js/, // Ignore Next.js configuration
    /^_site|coverage|cypress|docs|public|scripts[\\/]/, // Ignore
    // /^src[\\/]pages|types[\\/]/, // Ignore
  ],
}).then(res => {
  const tree = res.obj();

  const entrypoints = Object.keys(tree).filter(
    e => e.startsWith('pages/') || e.startsWith('pages\\'),
  );
  pruneTree(entrypoints, tree);

  const unusedFiles = Object.keys(tree);
  if (unusedFiles.length) {
    console.log(
      `⚠️  Found ${unusedFiles.length} files that no one is depending on, please consider removing:`,
    );
    unusedFiles.forEach(file => {
      console.log('\x1b[33m%s\x1b[0m', file);
    });
    process.exit(1);
  } else {
    console.log('🎉 No used files!');
    process.exit(0);
  }
});
