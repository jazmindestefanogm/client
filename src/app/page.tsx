"use client"

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  http,
  Address,
  Hash,
  TransactionReceipt,
  createPublicClient,
  createWalletClient,
  custom,
  stringify,
  Chain,
  EIP1193RequestFn,
  TransportConfig,
} from 'viem'
import { goerli } from 'viem/chains'
import 'viem/window'
import { wagmiContract } from './contracts/contract'

const publicClient = createPublicClient({
  chain: goerli,
  transport: http(),
})

const walletClient = createWalletClient({
  chain: goerli,
  transport: custom(window.ethereum!),
})

export default function Home() {
  const [account, setAccount] = useState<Address>()
  const [hash, setHash] = useState<Hash>()
  const [receipt, setReceipt] = useState<TransactionReceipt>()

  const connect = async () => {
    const [address] = await walletClient.requestAddresses()
    setAccount(address)
  }

  useEffect(() =>{
    connect()
  }, [])

  if (account)
    return (
      <>
        <div>Connected: {account}</div>
        <button>Mint</button>
        {receipt && (
          <>
            <div>
              Receipt:{' '}
              <pre>
                <code>{stringify(receipt, null, 2)}</code>
              </pre>
            </div>
          </>
        )}
      </>
    )
  return <button>Connect Wallet</button>
}
