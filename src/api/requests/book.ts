import { api } from '@/api'
import { Book, PageOrder } from '@/types'
import { BOOK_DEPLOY_STATUSES } from '@/enums'
import { config } from '@/config'

export function getBooks(opts: {
  deployStatus?: BOOK_DEPLOY_STATUSES[]
  chainId?: number
  pageLimit?: number
  pageOrder?: PageOrder
}) {
  return api.get<Book[]>('/integrations/books', {
    page: {
      limit: opts.pageLimit || config.DEFAULT_PAGE_LIMIT,
      order: opts.pageOrder || 'desc',
    },
    filter: {
      ...(opts.deployStatus?.length
        ? { deploy_status: opts.deployStatus.join(',') }
        : {}),
      ...(opts.chainId ? { chain_id: opts.chainId } : {}),
    },
  })
}

export function getBookById(id: number | string) {
  return api.get<Book>(`/integrations/books/${id}`)
}
