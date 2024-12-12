/*
import { createWeb3Modal } from '@web3modal/wagmi'
import { defaultWagmiConfig } from '@web3modal/wagmi'
import { mainnet, polygon, arbitrum } from 'wagmi/chains'
import { createPublicClient, http } from 'viem'

// IMPORTANT: Get your project ID from https://cloud.walletconnect.com/
const projectId = 'ac1cc01d83f3724fc5b2ba933acbe285'

const metadata = {
  name: 'Telegram Wallet Connect',
  description: 'Wallet Connection for Telegram Mini App',
  url: 'https://yourapp.com',
  icons: ['https://yourapp.com/icon.png']
}

const chains = [mainnet, polygon, arbitrum]
const config = defaultWagmiConfig({ 
  chains, 
  projectId, 
  metadata 
})

const web3modal = createWeb3Modal({
  wagmiConfig: config,
  projectId,
  chains
})

// DOM Elements
const connectBtn = document.getElementById('connectBtn')
const disconnectBtn = document.getElementById('disconnectBtn')
const walletStatus = document.getElementById('walletStatus')

// Telegram WebApp
const tg = window.Telegram.WebApp
tg.ready()
tg.expand()

// Connect Wallet Function
async function connectWallet() {
  try {
    const connection = await web3modal.open()
    const accounts = await connection.getAccounts()
    
    if (accounts.length > 0) {
      const address = accounts[0]
      
      // Fetch balance
      const client = createPublicClient({
        chain: mainnet,
        transport: http()
      })
      const balance = await client.getBalance({ address })
      
      // Update UI
      walletStatus.innerHTML = `
        Connected: ${address}<br>
        Balance: ${balance.toString()} wei
      `
      
      connectBtn.style.display = 'none'
      disconnectBtn.style.display = 'block'
      
      // Telegram feedback
      tg.HapticFeedback.impactOccurred('light')
    }
  } catch (error) {
    console.error('Connection Error:', error)
    walletStatus.textContent = `Connection Failed: ${error.message}`
  }
}

// Disconnect Wallet Function
async function disconnectWallet() {
  try {
    await web3modal.close()
    
    walletStatus.textContent = 'Wallet Disconnected'
    connectBtn.style.display = 'block'
    disconnectBtn.style.display = 'none'
    
    // Telegram feedback
    tg.HapticFeedback.impactOccurred('medium')
  } catch (error) {
    console.error('Disconnection Error:', error)
    walletStatus.textContent = `Disconnection Failed: ${error.message}`
  }
}

// Event Listeners
connectBtn.addEventListener('click', connectWallet)
disconnectBtn.addEventListener('click', disconnectWallet)

*/
/*
import { createWeb3Modal } from '@web3modal/wagmi'
import { defaultWagmiConfig } from '@web3modal/wagmi'
import { mainnet, polygon, arbitrum } from 'wagmi/chains'

// IMPORTANT: Replace with your WalletConnect Project ID
const projectId = 'ac1cc01d83f3724fc5b2ba933acbe285'

const metadata = {
  name: 'Telegram Wallet Connect',
  description: 'Wallet Connection for Telegram Mini App',
  url: 'https://yourapp.com',
  icons: ['https://yourapp.com/icon.png']
}

const chains = [mainnet, polygon, arbitrum]
const config = defaultWagmiConfig({ 
  chains, 
  projectId, 
  metadata 
})

const web3modal = createWeb3Modal({
  wagmiConfig: config,
  projectId,
  chains
})

// DOM Elements
const connectBtn = document.getElementById('connectBtn')
const disconnectBtn = document.getElementById('disconnectBtn')
const walletStatus = document.getElementById('walletStatus')
const walletAddressDisplay = document.getElementById('walletAddress')

// Telegram WebApp
const tg = window.Telegram.WebApp
tg.ready()
tg.expand()

// Track connection state
let isConnected = false
let walletAddress = null

// Connect Wallet Function
async function connectWallet() {
  try {
    // Open WalletConnect modal
    web3modal.open()

    // Set up event listener for connection
    web3modal.subscribeEvents(async (event) => {
      if (event.type === 'CONNECT') {
        try {
          // Get the connected account
          const account = await config.getAccount()
          
          if (account && account.address) {
            isConnected = true
            walletAddress = account.address

            // Update UI with connection success and wallet address
            updateWalletUI()
            
            // Telegram haptic feedback
            tg.HapticFeedback.impactOccurred('light')
          }
        } catch (accountError) {
          console.error('Account Fetch Error:', accountError)
          updateWalletUI('error', 'Failed to retrieve wallet address')
        }
      }
    })
  } catch (error) {
    console.error('Connection Error:', error)
    updateWalletUI('error', `Connection Failed: ${error.message}`)
  }
}

// Disconnect Wallet Function
async function disconnectWallet() {
  try {
    // Close Web3Modal
    await web3modal.close()
    
    // Clear connection state
    await config.disconnect()
    
    // Reset state
    isConnected = false
    walletAddress = null
    
    // Update UI
    updateWalletUI()
    
    // Telegram haptic feedback
    tg.HapticFeedback.impactOccurred('medium')
  } catch (error) {
    console.error('Disconnection Error:', error)
    updateWalletUI('error', `Disconnection Failed: ${error.message}`)
  }
}

// Update Wallet UI Function
function updateWalletUI(status = 'default', message = '') {
  // Update connection buttons and address display
  if (isConnected && walletAddress) {
    connectBtn.style.display = 'none'
    disconnectBtn.style.display = 'block'
    walletAddressDisplay.textContent = `Wallet: ${walletAddress}`
    walletAddressDisplay.style.display = 'block'
  } else {
    connectBtn.style.display = 'block'
    disconnectBtn.style.display = 'none'
    walletAddressDisplay.textContent = ''
    walletAddressDisplay.style.display = 'none'
  }

  // Update status display
  switch(status) {
    case 'error':
      walletStatus.innerHTML = `
        <div style="color: red; font-weight: bold;">
          ${message}
        </div>
      `
      break
    case 'default':
    default:
      if (isConnected && walletAddress) {
        walletStatus.innerHTML = `
          <div style="color: green; font-weight: bold;">
            Successfully Connected
          </div>
        `
      } else {
        walletStatus.innerHTML = `
          <div style="color: gray;">
            Wallet not connected
          </div>
        `
      }
  }
}

// Initial UI Setup
updateWalletUI()

// Event Listeners
connectBtn.addEventListener('click', connectWallet)
disconnectBtn.addEventListener('click', disconnectWallet)

// Attempt to reconnect on page load
async function initializeConnection() {
  try {
    const account = await config.getAccount()
    
    if (account && account.address) {
      isConnected = true
      walletAddress = account.address
      updateWalletUI()
    }
  } catch (error) {
    console.log('No previous connection found')
    updateWalletUI()
  }
}

// Initialize on page load
initializeConnection()
*/

/*
import { createWeb3Modal } from '@web3modal/wagmi'
import { defaultWagmiConfig } from '@web3modal/wagmi'
import { mainnet, polygon, bsc } from 'wagmi/chains'
import { 
  reconnect, 
  watchAccount, 
  getAccount 
} from '@wagmi/core'

const projectId = 'ac1cc01d83f3724fc5b2ba933acbe285'

const metadata = {
  name: 'Telegram Wallet Connect',
  description: 'Wallet Connection for Telegram Mini App',
  url: 'https://yourapp.com',
  icons: ['https://yourapp.com/icon.png']
}

const chains = [mainnet, polygon, bsc]
const config = defaultWagmiConfig({ 
  chains, 
  projectId, 
  metadata 
})

const web3modal = createWeb3Modal({
  wagmiConfig: config,
  projectId,
  chains
})

// DOM Elements
const connectBtn = document.getElementById('connectBtn')
const disconnectBtn = document.getElementById('disconnectBtn')
const walletStatus = document.getElementById('walletStatus')
const walletAddressDisplay = document.getElementById('walletAddress')

// Telegram WebApp
const tg = window.Telegram.WebApp
tg.ready()
tg.expand()

// Utility Function to Truncate Address
function truncateAddress(address) {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// Update Wallet UI Function
function updateWalletUI() {
  const account = getAccount(config)
  const isConnected = account.isConnected
  const address = account.address

  if (isConnected && address) {
    // Modify the connect button to show wallet info instead of disconnecting
    connectBtn.textContent = truncateAddress(address)
    connectBtn.style.backgroundColor = '#e0e0e0'
    connectBtn.style.color = 'black'
    
    disconnectBtn.style.display = 'block'
    
    walletAddressDisplay.textContent = `Wallet: ${truncateAddress(address)}`
    walletAddressDisplay.style.display = 'block'

    walletStatus.innerHTML = `
      <div style="color: green; font-weight: bold;">
        Successfully Connected
      </div>
    `
  } else {
    // Reset connect button to original state
    connectBtn.textContent = 'Connect Wallet'
    connectBtn.style.backgroundColor = '#4CAF50'
    connectBtn.style.color = 'white'
    
    disconnectBtn.style.display = 'none'
    walletAddressDisplay.textContent = ''
    walletAddressDisplay.style.display = 'none'

    walletStatus.innerHTML = `
      <div style="color: gray;">
        Wallet not connected
      </div>
    `
  }
}

// Connect Wallet Function
async function connectWallet() {
  const account = getAccount(config)
  
  if (account.isConnected) {
    // If already connected, open wallet connection modal to show connected wallet
    web3modal.open()
  } else {
    // If not connected, open wallet connection modal
    web3modal.open()
  }
}

// Disconnect Wallet Function
async function disconnectWallet() {
  try {
    // Close Web3Modal
    await web3modal.close()
    
    // Disconnect wallet
    await config.disconnect()
    
    // Update UI
    updateWalletUI()
    
    // Telegram haptic feedback
    tg.HapticFeedback.impactOccurred('medium')
  } catch (error) {
    console.error('Disconnection Error:', error)
    updateWalletUI()
  }
}

// Initialize Connection on Page Load
async function initializeConnection() {
  try {
    // Attempt to reconnect to previous session
    await reconnect(config)
    
    // Set up account watcher
    watchAccount(config, {
      onChange(account) {
        console.log('Account changed:', account)
        updateWalletUI()
      }
    })

    // Initial UI update
    updateWalletUI()
  } catch (error) {
    console.error('Initialization Error:', error)
    updateWalletUI()
  }
}

// Event Listeners
connectBtn.addEventListener('click', connectWallet)
disconnectBtn.addEventListener('click', disconnectWallet)

// Initialize on page load
initializeConnection()

// Optional: Add global error handler
window.addEventListener('error', (event) => {
  console.error('Unhandled error:', event.error)
})
*/

import { createWeb3Modal } from '@web3modal/wagmi'
import { defaultWagmiConfig } from '@web3modal/wagmi'
import { mainnet, polygon, arbitrum } from 'wagmi/chains'
import { 
  reconnect, 
  watchAccount, 
  getAccount 
} from '@wagmi/core'

const projectId = 'ac1cc01d83f3724fc5b2ba933acbe285'

const metadata = {
  name: 'Telegram Wallet Connect',
  description: 'Wallet Connection for Telegram Mini App',
  url: 'https://yourapp.com',
  icons: ['https://yourapp.com/icon.png']
}

const chains = [mainnet, polygon, arbitrum]
const config = defaultWagmiConfig({ 
  chains, 
  projectId, 
  metadata 
})

// Ensure Web3Modal is created as early as possible
const web3modal = createWeb3Modal({
  wagmiConfig: config,
  projectId,
  chains
})

// Debugging function to log connection state
function logConnectionState() {
  const account = getAccount(config)
  console.log('Connection State:', {
    isConnected: account.isConnected,
    address: account.address,
    status: account.status
  })
}

// Enhanced UI Update Function
function updateWalletUI() {
  // Add more robust logging
  logConnectionState()

  const account = getAccount(config)
  const isConnected = account.isConnected
  const address = account.address

  // Ensure DOM elements are selected
  const connectBtn = document.getElementById('connectBtn')
  const disconnectBtn = document.getElementById('disconnectBtn')
  const walletStatus = document.getElementById('walletStatus')
  const walletAddressDisplay = document.getElementById('walletAddress')

  if (!connectBtn || !disconnectBtn || !walletStatus || !walletAddressDisplay) {
    console.error('One or more DOM elements not found')
    return
  }

  if (isConnected && address) {
    connectBtn.textContent = truncateAddress(address)
    connectBtn.style.backgroundColor = '#e0e0e0'
    connectBtn.style.color = 'black'
    
    disconnectBtn.style.display = 'block'
    
    walletAddressDisplay.textContent = `Wallet: ${truncateAddress(address)}`
    walletAddressDisplay.style.display = 'block'

    walletStatus.innerHTML = `
      <div style="color: green; font-weight: bold;">
        Successfully Connected
      </div>
    `
  } else {
    connectBtn.textContent = 'Connect Wallet'
    connectBtn.style.backgroundColor = '#4CAF50'
    connectBtn.style.color = 'white'
    
    disconnectBtn.style.display = 'none'
    walletAddressDisplay.textContent = ''
    walletAddressDisplay.style.display = 'none'

    walletStatus.innerHTML = `
      <div style="color: gray;">
        Wallet not connected
      </div>
    `
  }
}

// Ensure function is globally accessible
window.updateWalletUI = updateWalletUI

// Connect Wallet Function
async function connectWallet() {
  const account = getAccount(config)
  
  if (account.isConnected) {
    web3modal.open()
  } else {
    web3modal.open()
  }
}

// Disconnect Wallet Function
async function disconnectWallet() {
  try {
    await web3modal.close()
    await config.disconnect()
    updateWalletUI()
  } catch (error) {
    console.error('Disconnection Error:', error)
    updateWalletUI()
  }
}

// Initialize Connection
async function initializeConnection() {
  try {
    // Attempt reconnect
    await reconnect(config)
    
    // Watch for account changes
    watchAccount(config, {
      onChange(account) {
        console.log('Account Changed:', account)
        updateWalletUI()
      }
    })

    // Initial UI update
    updateWalletUI()
  } catch (error) {
    console.error('Initialization Error:', error)
    updateWalletUI()
  }
}

// Utility Function
function truncateAddress(address) {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Set up event listeners
  const connectBtn = document.getElementById('connectBtn')
  const disconnectBtn = document.getElementById('disconnectBtn')
  
  if (connectBtn) {
    connectBtn.addEventListener('click', connectWallet)
  }
  
  if (disconnectBtn) {
    disconnectBtn.addEventListener('click', disconnectWallet)
  }

  // Initialize connection
  initializeConnection()
})

// Global error handling
window.addEventListener('error', (event) => {
  console.error('Unhandled error:', event.error)
})
