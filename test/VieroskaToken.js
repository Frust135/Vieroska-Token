var VieroskaToken = artifacts.require("VieroskaToken");

contract('VieroskaToken', function(accounts){

    it('Sets the total supply upon deployment', function(){
        return VieroskaToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(), 500, 'Sets the total supply to 500')
        })
    });
})