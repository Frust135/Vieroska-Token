var VieroskaToken = artifacts.require("VieroskaToken");

contract('VieroskaToken', function(accounts){
    var tokenInstance;

    it('Initialize the contract with the correct values', function(){
        return VieroskaToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name){
            assert.equal(name, 'Vieroska', 'Has the correct NAME');
            return tokenInstance.symbol();
        }).then(function(symbol){
            assert.equal(symbol, 'VSK', 'Has the correct SYMBOL')            
            return tokenInstance.standard()
        }).then(function(standard){
            assert.equal(standard, 'Vieroska V1.0', 'Has the correct STANDARD')
        });
    });

    it('Allocates the initial supply upon deployment', function(){
        return VieroskaToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(), 500, 'Sets the total supply to 500');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance){
            assert.equal(adminBalance.toNumber(), 500, 'It allocates the initial supply to the admin account');
        })
    });


    it('Transfers token ownership', function(){
        return VieroskaToken.deployed().then(function(instance){
            tokenInstance = instance;
            // Test 'require' statement first by transfering something larger than the sender's balance
            return tokenInstance.transfer.call(accounts[1], 501) // Call doens't create the transaction
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert') >= 0, 'Error message must containt revert');
            return tokenInstance.transfer.call(accounts[1], 4, {from: accounts[0] });
        }).then(function(success){
            assert.equal(success, true, 'It returns true');
            return tokenInstance.transfer(accounts[1], 4, {from: accounts[0] });
        }).then(function(receipt){
            assert.equal(receipt.logs.length, 1, 'Triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'Should be the "Transfer" event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'Logs the account the tokens are transferred from');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'Logs the account the tokens are transferred to');
            assert.equal(receipt.logs[0].args._value, 4, 'Logs the transfer amount');
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance){
            assert.equal(balance.toNumber(), 4, 'Adds the amount to the receiving account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance){
            assert.equal(balance.toNumber(), 496, 'Deducts the amount from the sending account');
        });
    })
});