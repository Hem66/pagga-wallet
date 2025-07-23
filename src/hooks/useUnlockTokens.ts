import { useCallback, useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { abi } from '../config/abi'; // Path to your ABI
import { contracts } from '../config/contracts'; // Your contracts per chain
import { wagmiConfig } from '@/config/wagmi';
import { waitForTransactionReceipt } from '@wagmi/core';

type UnlockTokensHook = {
  unlockTokens: (amount: number) => Promise<void>;
  loading: boolean;
  error: string | null;
};

export const useUnlockTokens = (): UnlockTokensHook => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { chainId } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const unlockTokens = useCallback(
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
          functionName: 'unlockTokens',
          args: [amount], // Pass the amount as an argument
        });
        console.log("UNLOCK TOKENS hash:", res);

        const receipt = await waitForTransactionReceipt(wagmiConfig, {
          hash: res, // The hash of the transaction
        });
        console.log("UNLOCK TOKENS receipt:", receipt);
        setLoading(false);
      } catch (err: any) {
        setError(err?.message ?? 'An unknown error occurred');
        console.log('UNLOCK TOKENS ERROR:', err);
        setLoading(false);
      }
    },
    [chainId],
  );

  return { unlockTokens, loading, error };
};
