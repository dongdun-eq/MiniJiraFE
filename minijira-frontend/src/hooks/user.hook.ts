import { useQuery } from "@tanstack/react-query";
import userService from "../service/user.service";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: ({ signal }) => userService.getAll(signal),
    staleTime: 5 * 60 * 1000,
  });
};
