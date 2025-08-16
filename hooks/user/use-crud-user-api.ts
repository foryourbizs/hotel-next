import {
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";

import { apiUtils } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/constants";
import type { PaginatedResponse } from "@/types/api";
import type { CrudQuery } from "@/types/crud";
import type { User } from "@/types/user/crud-user";

/**
 * User CRUD API 훅 (자동 생성)
 *
 * ⚠️  이 파일은 덮어쓰기 됩니다. 직접 수정하지 마세요.
 * 커스텀 기능은 use-user-api.ts 파일에 추가하세요.
 *
 * 백엔드에서 허용된 메서드: index, show
 */
export function useCrudUserApi() {
  const queryClient = useQueryClient();
  const baseUrl = "users";

  return {
    /**
     * User 목록 조회
     * @filters 허용된 필터: email
     * @includes 허용된 관계: posts
     */
    index: (
      query?: CrudQuery,
      options?: UseQueryOptions<PaginatedResponse<User>>
    ) => {
      return useQuery({
        queryKey: QUERY_KEYS.USER.list(query as Record<string, unknown>),
        queryFn: () => {
          const queryString = query
            ? `?${apiUtils.buildCrudQuery(query as Record<string, unknown>)}`
            : "";
          return apiUtils.get<PaginatedResponse<User>>(
            `${baseUrl}${queryString}`
          );
        },
        ...options,
      });
    },

    /**
     * User 단일 조회
     * @includes 허용된 관계: posts
     */
    show: (id: string, options?: UseQueryOptions<User>) => {
      return useQuery({
        queryKey: QUERY_KEYS.USER.detail(id),
        queryFn: () => apiUtils.get<User>(`${baseUrl}/${id}`),
        enabled: !!id,
        ...options,
      });
    },
  };
}
