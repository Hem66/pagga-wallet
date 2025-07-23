import { useCallback, useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { abi } from '../config/abi'; // Make sure to replace this with the correct path to your ABI
import { contracts } from '../config/contracts'; // Your contracts per chain
import { waitForTransactionReceipt } from '@wagmi/core';
import { wagmiConfig } from '@/config/wagmi';

type ClaimTokenHook = {
  claim: () => Promise<void>;
  loading: boolean;
  error: string | null;
};

export const useClaim = (): ClaimTokenHook => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { chainId } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const claim = useCallback(
    async () => {
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
          address: contractAddress, // Use contract address based on the selected chain
          functionName: 'claim',
        });
        console.log("CLAIM RESULT:", res);
        
        const receipt = await waitForTransactionReceipt(wagmiConfig, {
          hash: res, // The hash of the transaction
        });
        console.log("CLAIM receipt:", receipt);
        setLoading(false);
      } catch (err: any) {
        setError(err?.message ?? 'An unknown error occurred');
        console.log('CLAIM ERROR:', err);
        setLoading(false);
      }
    },
    [chainId],
  );

  return { claim, loading, error };
};
