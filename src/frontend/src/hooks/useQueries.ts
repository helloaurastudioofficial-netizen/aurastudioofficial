import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { OrderRecord } from "../backend";
import { Status } from "../backend";
import { useActor } from "./useActor";

export function useGetAllOrders() {
  const { actor, isFetching } = useActor();
  return useQuery<OrderRecord[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitOrder() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (order: OrderRecord) => {
      if (!actor) throw new Error("Service not ready. Please try again.");
      const result = await actor.submitOrder(order);
      return result;
    },
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Status }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.updateOrderStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export { Status };
