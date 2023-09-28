import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUs, ServerResponse } from '../models/models'

export const githubApi = createApi({
    reducerPath: 'github/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com/'
    }),
    endpoints: build => ({
        searchUsers: build.query<IUs[], string>({
            query: (search: string) => ({
                url: `search/users`,
                params: {
                    q: search,
                    per_page: 10
                }
            }),
            transformResponse: (response: ServerResponse<IUs>) => response.items
                
            
        })
    })
})

export const { useSearchUsersQuery } = githubApi