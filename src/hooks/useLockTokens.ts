import { useCallback, useState } from 'react';
import { useAccount, useWriteContract, } from 'wagmi';
import { abi } from '../config/abi'; // Path to your ABI
import { contracts } from '../config/contracts'; // Your contracts per chain
import { waitForTransactionReceipt } from '@wagmi/core';
import { wagmiConfig } from '@/config/wagmi';

type LockTokensHook = {
  lockTokens: (amount: number) => Promise<void>;
  loading: boolean;
  error: string | null;
};

export const useLockTokens = (): LockTokensHook => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { chainId } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const lockTokens = useCallback(
    async (amount: number) => {
      setLoading(true);
      setError(null);

      try {
        if (!chainId) {
          throw new Error('chainId is undefined');
        }

        const contractAddress = contracts[chainId].claim;

        if (!contractAddress) {
          throw new Error('Contract address not found for this chain');
        }

        const res = await writeContractAsync({
          abi: abi,
          address: contractAddress,
          functionName: 'lockTokens',
          args: [amount], // Pass the amount as an argument
        });
        console.log("LOCK TOKENS hash:", res);

        const receipt = await waitForTransactionReceipt(wagmiConfig, {
          hash: res, // The hash of the transaction
        });
        console.log("LOCK TOKENS receipt:", receipt);
        setLoading(false);
      } catch (err: any) {
        setError(err?.message ?? 'An unknown error occurred');
        console.log('LOCK TOKENS ERROR:', err);
        setLoading(false);
      }
    },
    [chainId],
  );

  return { lockTokens, loading, error };
};
