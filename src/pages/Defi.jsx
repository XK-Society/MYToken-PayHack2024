import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import SimpleStakingABI from '../../contract/ContractABI.json';

const Defi = () => {
  const [stakingContract, setStakingContract] = useState(null);
  const [account, setAccount] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');
  const [stakedBalance, setStakedBalance] = useState('0');
  const [pendingRewards, setPendingRewards] = useState('0');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);

  const SEPOLIA_CHAIN_ID = '0xaa36a7'; // Chain ID for Sepolia
  const CONTRACT_ADDRESS = "0x0008e041f26Cda8fB83085F79694098b5d045bAf";

  const switchToSepolia = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
      return true;
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: SEPOLIA_CHAIN_ID,
              chainName: 'Sepolia Test Network',
              nativeCurrency: {
                name: 'SepoliaETH',
                symbol: 'SepoliaETH',
                decimals: 18
              },
              rpcUrls: ['https://sepolia.infura.io/v3/'],
              blockExplorerUrls: ['https://sepolia.etherscan.io/']
            }],
          });
          return true;
        } catch (addError) {
          console.error('Error adding Sepolia network:', addError);
          return false;
        }
      }
      console.error('Error switching to Sepolia network:', switchError);
      return false;
    }
  };

  const checkNetwork = async () => {
    if (window.ethereum) {
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
      const isSepoliaNetwork = currentChainId === SEPOLIA_CHAIN_ID;
      setIsWrongNetwork(!isSepoliaNetwork);
      return isSepoliaNetwork;
    }
    return false;
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, SimpleStakingABI.abi, signer);
            setStakingContract(contract);

            // Get initial stake info
            updateStakeInfo(accounts[0], contract);
          }
        } catch (error) {
          console.error("Error checking connection:", error);
        }
      }
    };

    checkConnection();
  }, []);

  const updateStakeInfo = async (userAddress, contract) => {
    try {
      const info = await contract.getStakeInfo(userAddress);
      setStakedBalance(ethers.formatEther(info.stakedAmount));
      setPendingRewards(ethers.formatEther(info.pendingRewards));
    } catch (error) {
      console.error("Error getting stake info:", error);
    }
  };

  const handleStake = async (e) => {
    e.preventDefault();
    if (!stakingContract || !stakeAmount) return;

    try {
      const tx = await stakingContract.stake({
        value: ethers.parseEther(stakeAmount)
      });
      await tx.wait();
      
      // Update stake info after successful stake
      updateStakeInfo(account, stakingContract);
      setStakeAmount('');
    } catch (error) {
      console.error("Error staking:", error);
    }
  };

  const handleUnstake = async () => {
    if (!stakingContract || !stakedBalance) return;

    try {
      const tx = await stakingContract.withdraw(
        ethers.parseEther(stakedBalance)
      );
      await tx.wait();
      
      // Update stake info after successful unstake
      updateStakeInfo(account, stakingContract);
    } catch (error) {
      console.error("Error unstaking:", error);
    }
  };

  const handleClaimRewards = async () => {
    if (!stakingContract) return;

    try {
      const tx = await stakingContract.claimRewards();
      await tx.wait();
      
      // Update stake info after claiming rewards
      updateStakeInfo(account, stakingContract);
    } catch (error) {
      console.error("Error claiming rewards:", error);
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        setIsConnecting(true);
        
        // Check and switch to Sepolia network first
        const isCorrectNetwork = await checkNetwork();
        if (!isCorrectNetwork) {
          const switched = await switchToSepolia();
          if (!switched) {
            setIsConnecting(false);
            return;
          }
        }

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setIsConnected(true);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, SimpleStakingABI.abi, signer);
        setStakingContract(contract);

        // Get initial stake info
        updateStakeInfo(accounts[0], contract);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      } finally {
        setIsConnecting(false);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      checkNetwork(); // Check network on initial load

      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setIsConnected(false);
          setStakingContract(null);
        }
      });

      window.ethereum.on('chainChanged', async (chainId) => {
        const isSepoliaNetwork = chainId === SEPOLIA_CHAIN_ID;
        setIsWrongNetwork(!isSepoliaNetwork);
        if (!isSepoliaNetwork) {
          setStakingContract(null);
        } else if (isConnected) {
          // Reconnect if we're on the correct network
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(CONTRACT_ADDRESS, SimpleStakingABI.abi, signer);
          setStakingContract(contract);
        }
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, [isConnected]);

  useEffect(() => {
    let intervalId;

    if (isConnected && stakingContract && account) {
      // Initial fetch
      updateStakeInfo(account, stakingContract);

      // Set up interval for subsequent fetches
      intervalId = setInterval(() => {
        updateStakeInfo(account, stakingContract);
      }, 10000); // 10 seconds
    }

    // Cleanup interval on unmount or when dependencies change
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isConnected, stakingContract, account]); // Dependencies

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Stake</h1>
        
        {isWrongNetwork && isConnected && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            Please switch to the Sepolia Test Network
            <button
              onClick={switchToSepolia}
              className="ml-4 px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Switch Network
            </button>
          </div>
        )}

        {!isConnected ? (
          <div className="text-center py-8">
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="connect-wallet-button px-8 py-3 rounded-lg text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed mx-auto flex items-center justify-center gap-2 w-fit"
            >
              {isConnecting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Connecting...
                </>
              ) : (
                "Connect Wallet"
              )}
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Wallet Address</h2>
                <div className="text-sm text-gray-500">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </div>
              </div>
              <p>Staked Balance: {stakedBalance} ETH</p>
              <p>Pending Rewards: {pendingRewards} ETH</p>
            </div>

            <form onSubmit={handleStake} className="mb-6">
              <div className="flex gap-4">
                <input
                  type="number"
                  step="0.01"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  placeholder="Amount to stake"
                  className="flex-1 p-2 border rounded"
                />
                <button
                  type="submit"
                  className="gradient-button px-6 py-2 rounded-lg text-white font-semibold 
                             hover:shadow-lg transition-all duration-300 
                             border-2 border-white/20 hover:border-white/40"
                >
                  Stake
                </button>
              </div>
            </form>

            <div className="flex gap-4">
              <button
                onClick={handleUnstake}
                className="flex-1 border-2 px-4 py-2 rounded hover:shadow-lg"
              >
                Unstake All
              </button>
              <button
                onClick={handleClaimRewards}
                className="flex-1 gradient-button-green px-4 py-2 rounded-lg text-white font-semibold
                           hover:shadow-lg transition-all duration-300
                           border-2 border-white/20 hover:border-white/40"
              >
                Claim Rewards
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Defi