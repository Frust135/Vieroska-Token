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
});