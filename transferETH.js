import { ethers } from "ethers";
import address, { receiver } from "./address.js";
import infura from "./config.js";

// network: using the Rinkeby testnet
const network = 'rinkeby'
// const network = 'homestead' //mainnet
const provider = ethers.getDefaultProvider(network, {
    infura: {
          projectId: infura.PROJECT_ID,
          projectSecret: infura.PROJECT_SECRET,
        },
});

try {
    address.forEach(async (element,index) => {
        const privateKey = element.pk;
        let wallet = new ethers.Wallet(privateKey, provider);
        let receiverAddress = receiver;
        let balance = await wallet.getBalance();
        let ethBalance = ethers.utils.formatUnits(balance, "ether");
        let transferValue = (ethBalance-0.05).toFixed(2);
        if(transferValue<=0) return;
        let tx = {
            to: receiverAddress,
            // Convert currency unit from ether to wei
            value: ethers.utils.parseEther(transferValue.toString()),
        }
        // Send a transaction
        let txObj = await wallet.sendTransaction(tx);
        console.log(index+" txn","https://rinkeby.etherscan.io/tx/"+txObj.hash);
    })
} catch (e) {
    console.log(e);
}


