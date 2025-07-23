import { useAccount, useReadContract } from 'wagmi';
import { abi } from '../config/abi'; // Path to your ABI
import { contracts } from '../config/contracts'; // Your contracts per chain

type TokenBalancesHook = {
  lockedBalance: string | null;
  unlockedBalance: string | null;
  loading: boolean;
  error: boolean;
  refreshBalances: () => void; // Allows manually refreshing the balances
};

export const useTokenBalances = (): TokenBalancesHook => {
  const { address, chainId } = useAccount();
  const contractAddress = chainId ? contracts[chainId as number]?.claim : undefined;
  //const contractAddresses = chainId ? contracts[chainId] : undefined;
    
  const { data: lockedBalance, isError: errorLockedBalance, isLoading: loadingLockedBalance, refetch: refetchLockedBalance } = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'lockedBalanceOf',
    args: [address],
  });

  // Fetch unlocked balance
  const { data: unlockedBalance, isError: errorUnlockedBalance, isLoading: loadingUnlockedBalance, refetch: refetchUnlockedBalance } = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'balanceOf',
    args: [address],
  });

  return {
    lockedBalance: lockedBalance as string,
    unlockedBalance: unlockedBalance as string,
    loading: loadingUnlockedBalance || loadingLockedBalance,
    error: errorUnlockedBalance || errorLockedBalance,
    refreshBalances: () => { 
      refetchLockedBalance(); 
      refetchUnlockedBalance(); 
    },
  };
};
