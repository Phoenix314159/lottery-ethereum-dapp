const assert = require('assert')
const {['Lottery.sol']: {Lottery: {abi, evm: {bytecode: {object}}}}} = require('../compile')
const provider = require('ganache-cli').provider()
const Web3 = require('web3')
const web3 = new Web3(provider)
let lottery, accounts, lotterySendMethod, from, data = object, gas = '1000000'

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()
  lottery = await new web3.eth.Contract(abi).deploy({data})
  from = accounts[0]
  lotterySendMethod = lottery.send({from, gas})
})

describe('Lottery', () => {

  it('deploys a contract', () => {
      lotterySendMethod.then(() => {
        assert.ok(lottery.options.address)
      })
  })

  it('allows one account to enter',  () => {
    lotterySendMethod.then(() => {
      lottery.methods.enter().send({from, value: web3.utils.toWei('.02', 'ether')}).then(() => {
        const players = lottery.methods(getPlayers().call({from})).then(() => {
          assert.equal(from, players[0])
          assert.equal(1, players.length)
        })
      })
    })
  })

})