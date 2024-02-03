import type { Notification } from '../types/notification'

export const useToast = () => {
  const notifications = useState<Notification[]>('notifications', () => [])

  const add = (notification: Partial<Notification>) => {
    const body = {
      id: new Date().getTime().toString(),
      ...notification
    }

    const index = notifications.value.findIndex((n: any) => n.id === body.id)

    if (index === -1) {
      notifications.value.push(body as Notification)
    }

    return body
  }

  const remove = (id: string) => {
    notifications.value = notifications.value.filter((n: any) => n.id !== id)
  }

  return {
    add,
    remove
  }
}