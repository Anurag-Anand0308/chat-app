import {create} from 'zustand';
import {toast} from 'react-hot-toast';
import {axiosInstance} from "../lib/axios";
import {useAuthStore} from './useAuthStore';


export const useChatStore = create((set,get) => ({
    messages:[],
    users : [],
    selectedUser : null,
    isUserLoading :false,
    isMessagesLoading : false,


    getUsers : async ()=>{
        set({isUserLoading:true})
        try {
            const response = await axiosInstance.get('messages/users');
            set({users:response.data})
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isUserLoading:false});
        }
    },
    getMessages : async (userId)=>{
        set({isMassagesLoading:true})
        try {
            const response = await axiosInstance.get(`messages/${userId}`);
            set({messages:response.data})
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isMassagesLoading:false});
        }
    },

    sendMessage: async(messageData)=>{
        const{selectedUser,messages} = get();
        try{
            const response = await axiosInstance.post(`messages/send/${selectedUser._id}`, messageData);
            set({messages:[...messages,response.data]});
        }catch (error) {
            toast.error(error.response.data.message);
        }
    },
    subscribeToMessages:(socket)=>{
        const {selectedUser}= get();
        if (!selectedUser || !socket) return;//changes done here
        // const socket = useAuthStore().getState().socket;
        socket.on("newMessage",(newMessage)=>{
            set({
                messages: [...get().messages, newMessage]
            })
        })
    },
    unsubscribeFromMessages:(socket)=>{
        // const socket = useAuthStore().getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (user)=>set({selectedUser: user}),

}))