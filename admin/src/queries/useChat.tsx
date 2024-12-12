import chatApiRequest from "@/apiRequests/chat"
import { useMutation } from "@tanstack/react-query"

export const useGetMessageMutation = () => {
    return useMutation({
        mutationFn: chatApiRequest.sMessage
    })
}

export const usesGetAllUserMutation = () => {
    return useMutation({
        mutationFn: chatApiRequest.sGetAllUserIdsAndLatestMessage
    })
}



