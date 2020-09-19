const test = (root, args, ctx) => {
  console.log('root: ', root)
  console.log('args: ', args)
  console.log('ctx: ', ctx)
  return "world";
};

module.exports = { test };
