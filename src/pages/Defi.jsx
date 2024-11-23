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
  const [ethPrice, setEthPrice] = useState(0);
  const [myrRate, setMyrRate] = useState(0);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [isStaking, setIsStaking] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

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

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000); // Hide after 3 seconds
  };

  const handleStake = async (e) => {
    e.preventDefault();
    if (!stakingContract || !stakeAmount) return;

    setIsStaking(true);
    try {
      const tx = await stakingContract.stake({
        value: ethers.parseEther(stakeAmount)
      });
      showNotification('Transaction submitted! Waiting for confirmation...');
      await tx.wait();
      
      updateStakeInfo(account, stakingContract);
      setStakeAmount('');
      showNotification(`Successfully staked ${stakeAmount} ETH!`);
    } catch (error) {
      console.error("Error staking:", error);
      showNotification('Failed to stake tokens', 'error');
    } finally {
      setIsStaking(false);
    }
  };

  const handleUnstake = async () => {
    if (!stakingContract || !stakedBalance) return;

    setIsUnstaking(true);
    try {
      const tx = await stakingContract.withdraw(
        ethers.parseEther(stakedBalance)
      );
      showNotification('Transaction submitted! Waiting for confirmation...');
      await tx.wait();
      
      updateStakeInfo(account, stakingContract);
      showNotification(`Successfully unstaked ${stakedBalance} ETH!`);
    } catch (error) {
      console.error("Error unstaking:", error);
      showNotification('Failed to unstake tokens', 'error');
    } finally {
      setIsUnstaking(false);
    }
  };

  const handleClaimRewards = async () => {
    if (!stakingContract) return;

    setIsClaiming(true);
    try {
      const tx = await stakingContract.claimRewards();
      showNotification('Transaction submitted! Waiting for confirmation...');
      await tx.wait();
      
      updateStakeInfo(account, stakingContract);
      showNotification(`Successfully claimed ${pendingRewards} ETH in rewards!`);
    } catch (error) {
      console.error("Error claiming rewards:", error);
      showNotification('Failed to claim rewards', 'error');
    } finally {
      setIsClaiming(false);
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
      }, 5000); // 10 seconds
    }

    // Cleanup interval on unmount or when dependencies change
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isConnected, stakingContract, account]); // Dependencies

  const fetchPrices = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=myr');
      const data = await response.json();
      setMyrRate(data.ethereum.myr);
    } catch (error) {
      console.error("Error fetching ETH price:", error);
    }
  };

  useEffect(() => {
    fetchPrices(); // Initial fetch
    const interval = setInterval(fetchPrices, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const ethToMYR = (ethAmount) => {
    if (!myrRate || !ethAmount) return '0.00';
    return (parseFloat(ethAmount) * myrRate).toFixed(2);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {notification.show && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg transition-all transform 
                     ${notification.type === 'error' 
                       ? 'bg-red-500' 
                       : 'bg-gradient-to-r from-green-500 to-green-600'} 
                     text-white font-semibold z-50
                     animate-slide-in-right`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'error' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            )}
            {notification.message}
          </div>
        </div>
      )}

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
                <h2 className="text-lg font-semibold">Account Address</h2>
                <div className="text-sm text-gray-500">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p>Staked Balance:</p>
                  <div className="text-right">
                    <p>{stakedBalance} ETH</p>
                    <p className="text-sm text-gray-500">
                      ≈ RM {ethToMYR(stakedBalance)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p>Pending Rewards:</p>
                  <div className="text-right">
                    <p>{pendingRewards} ETH</p>
                    <p className="text-sm text-gray-500">
                      ≈ RM {ethToMYR(pendingRewards)}
                    </p>
                  </div>
                </div>
              </div>
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
                  disabled={isStaking}
                />
                <button
                  type="submit"
                  disabled={isStaking || !stakeAmount}
                  className="connect-wallet-button px-6 py-2 rounded-lg text-white font-semibold 
                           hover:shadow-lg transition-all duration-300 
                           border-2 border-white/20 hover:border-white/40
                           disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center gap-2"
                >
                  {isStaking ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Staking...
                    </>
                  ) : (
                    'Stake'
                  )}
                </button>
              </div>
            </form>

            <div className="flex gap-4">
              <button
                onClick={handleUnstake}
                disabled={isUnstaking || !stakedBalance}
                className="flex-1 px-4 py-2 rounded-lg border-2 text-black font-semibold
                          hover:shadow-lg transition-all duration-300
                          disabled:opacity-50 disabled:cursor-not-allowed
                          flex items-center justify-center gap-2"
              >
                {isUnstaking ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Unstaking...
                  </>
                ) : (
                  'Unstake All'
                )}
              </button>
              <button
                onClick={handleClaimRewards}
                disabled={isClaiming || !pendingRewards}
                className="flex-1 gradient-button-green px-4 py-2 rounded-lg text-white font-semibold
                           hover:shadow-lg transition-all duration-300
                           border-2 border-white/20 hover:border-white/40
                           disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center gap-2"
              >
                {isClaiming ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Claiming...
                  </>
                ) : (
                  'Claim Rewards'
                )}
              </button>
            </div>
          </>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Coming Soon</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Lending</h2>
            </div>
            <p className="text-gray-600">Earn interest by lending your tokens to other users.</p>
          </div>

          {/* <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Governance</h2>
            </div>
            <p className="text-gray-600">Participate in protocol decisions with your staked tokens.</p>
          </div> */}

          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Instant Loans</h2>
            </div>
            <p className="text-gray-600">Access instant loans with no collateral required.</p>
          </div>

          {/* <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Token Swaps</h2>
            </div>
            <p className="text-gray-600">Swap tokens directly within the platform.</p>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Defi