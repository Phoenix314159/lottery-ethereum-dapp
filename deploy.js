const HDWalletProvider = require('truffle-hdwallet-provider');
const {mnemonic, infuraUrl} = require('./config');
const Web3 = require('web3');
const {['Lottery.sol']: {Lottery : {abi, evm: {bytecode: {object}}}}} = require('./compile');
const provider = new HDWalletProvider(mnemonic, infuraUrl);
const web3 = new Web3(provider);

(async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account: ', accounts[0]);
  const result = await new web3.eth.Contract(abi)
    .deploy({data: `0x${object}`})
    .send({from: accounts[0]});
  console.log('Contract deployed to: ', result.options.address)
})();