import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { createClient } from "@dynamic-labs/client";
import { ViemExtension } from "@dynamic-labs/viem-extension";
import { ZeroDevExtension } from "@dynamic-labs/zerodev-extension";
import { useCallback, useMemo } from "react";
import { MULTI_ESCROW_ABI } from "@/abi/multiEscrow";
import { encodeFunctionData } from "viem";
import { ESCROW_CONTRACT_ADDRESS } from "./constants";

const dynamicClient = createClient({
  environmentId: import.meta.env.VITE_DYNAMIC_LAB_ENV_ID,
})
  .extend(ViemExtension())
  .extend(ZeroDevExtension());

export const useZeroDevKernal = () => {
  const { primaryWallet } = useDynamicContext();
  const kernel = useMemo(async () => {
    if (!primaryWallet) return null;
    return await dynamicClient.zeroDev.createKernelClient({
      wallet: primaryWallet,
    });
  }, [primaryWallet]);

  return kernel;
};

export const useCreateEscrow = () => {
  const kernel = useZeroDevKernal();

  return useCallback(
    async ({
      seller,
      productId,
      transactionDetails,
    }: {
      seller: string;
      productId: string;
      transactionDetails: string;
    }) => {
      if (!kernel) return null;
      const zerodevKernel = await kernel;
      const account = zerodevKernel?.account;
      return zerodevKernel?.sendUserOperation({
        account: account,
        calls: [
          {
            data: encodeFunctionData({
              abi: MULTI_ESCROW_ABI,
              args: [seller as `0x${string}`, productId, transactionDetails],
              functionName: "createEscrow",
            }),
            to: ESCROW_CONTRACT_ADDRESS,
            value: BigInt(0),
          },
        ],
      });
    },
    [kernel]
  );
};
