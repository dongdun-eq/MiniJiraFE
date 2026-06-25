import { useQuery } from "@tanstack/react-query";
import userService from "../service/user.service";
import { QUERY_KEY_USERS } from "../constants";

export const useUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEY_USERS],
    queryFn: ({ signal }) => userService.getAll(signal),
    staleTime: 5 * 60 * 1000,
  });
};
