import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    ACTIVE: 'bg-green-100 text-green-800',
    active: 'bg-green-100 text-green-800',
    Active: 'bg-green-100 text-green-800',
    INACTIVE: 'bg-gray-100 text-gray-800',
    inactive: 'bg-gray-100 text-gray-800',
    Inactive: 'bg-gray-100 text-gray-800',
    ON_LEAVE: 'bg-yellow-100 text-yellow-800',
    'On Leave': 'bg-yellow-100 text-yellow-800',
    TERMINATED: 'bg-red-100 text-red-800',
    Terminated: 'bg-red-100 text-red-800',
    PENDING: 'bg-yellow-100 text-yellow-800',
    pending: 'bg-yellow-100 text-yellow-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    approved: 'bg-green-100 text-green-800',
    Approved: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
    rejected: 'bg-red-100 text-red-800',
    Rejected: 'bg-red-100 text-red-800',
    PAID: 'bg-blue-100 text-blue-800',
    paid: 'bg-blue-100 text-blue-800',
    Paid: 'bg-blue-100 text-blue-800',
  }
  return map[status] ?? 'bg-gray-100 text-gray-800'
}

export function paginate<T>(array: T[], page: number, limit: number) {
  const start = (page - 1) * limit
  return {
    data: array.slice(start, start + limit),
    total: array.length,
    page,
    limit,
    totalPages: Math.ceil(array.length / limit),
  }
}
