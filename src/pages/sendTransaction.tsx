import * as React from 'react'
import { usePrepareSendTransaction } from 'wagmi'
import { utils } from 'ethers'
import { useDebounce } from 'use-debounce';


export function SendTransaction() {
 const [to, setTo] = React.useState('')
 const [debouncedTo] = useDebounce(to, 500)

 const [amount, setAmount] = React.useState('')
 const [debouncedAmount] = useDebounce(amount, 500)

 const { config } = usePrepareSendTransaction({
 request: {
 to: debouncedTo,
 value: debouncedAmount ? utils.parseEther(debouncedAmount) : undefined,
 },
 })

 return (
 <form>
 <input
 aria-label="Recipient"
 onChange={(e) => setTo(e.target.value)}
 placeholder="0xA0Cf…251e"
 value={to}
 />
 <input
 aria-label="Amount (ether)"
 onChange={(e) => setAmount(e.target.value)}
 placeholder="0.05"
 value={amount}
 />
 <button>Send</button>
 </form>
 )
}
