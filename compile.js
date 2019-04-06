const solc = require('solc');
const path = require('path');
const fs = require('fs-extra');
const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const content = fs.readFileSync(lotteryPath, 'utf8');

const createConfiguration = () => {
  return {
    language: 'Solidity',
    sources: {'Lottery.sol': {content}},
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  }
};

const getImports = dependency => {
  switch (dependency) {
    case 'Lottery.sol':
      return {contents: content};
    /*case 'AnotherImportedSolidityFile.sol':
        return {contents: fs.readFileSync(path.resolve(__dirname, 'contracts', 'AnotherImportedSolidityFile.sol'), 'utf8')};*/
    default:
      return {error: 'File not found'}
  }
};

const compileSources = config => {
  return JSON.parse(solc.compile(JSON.stringify(config), getImports));
};

const {contracts} = compileSources(createConfiguration());

// fs.writeFileSync('contract.txt', contracts)
module.exports = contracts;