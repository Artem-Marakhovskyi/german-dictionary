import seedlang from './src/seedlang/cases/index';

const run = async () => {
  await seedlang.parseHtmls();
};

run();
