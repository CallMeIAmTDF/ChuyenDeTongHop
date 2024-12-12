import levelApiRequest from "@/apiRequests/level"
import uploadApiRequest from "@/apiRequests/upload"
import { useMutation } from "@tanstack/react-query"

export const useUploadLevelMutation = () => {
    return useMutation({
        mutationFn: uploadApiRequest.sLevelImage
    })
}

export const useUploadWordMutation = () => {
    return useMutation({
        mutationFn: uploadApiRequest.sWordImage
    })
}