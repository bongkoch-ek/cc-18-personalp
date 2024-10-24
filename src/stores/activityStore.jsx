import axios from 'axios'
import { create } from 'zustand'

const useActivityStore = create((set, get) => ({
    activity: [],
    loading: false,
    type: [],
    ownList: [],
    joinList: [],
    bookmarkList: [],
    getAllActivity: async () => {
        set({ loading: true })
        const rs = await axios.get('http://localhost:8000/activity')
        set({ activity: rs.data.result, loading: false })
        return rs.data.result
    },
    getActivityType: async () => {
        set({ loading: true })
        const rs = await axios.get('http://localhost:8000/activity/getType')
        set({ type: rs.data.result, loading: false })
        return rs.data.result
    },
    createActivity: async (body, token, user) => {
        set({ loading: true })
        const rs = await axios.post('http://localhost:8000/activity/create', body, {
            headers: { Authorization: `Bearer ${token}` }
        })
        set({ loading: false })
        console.log(rs)
    },
    getActivityByUserId: async (token) => {
        set({ loading: true })
        const rs = await axios.get('http://localhost:8000/activity/getActivityByUserId', {
            headers: { Authorization: `Bearer ${token}` }
        })
        set({ ownList: rs.data.result, loading: false })
        return rs.data.result
    },
    editActivity: async (body, token) => {
        set({ loading: true })
        const rs = await axios.patch('http://localhost:8000/activity/edit', body, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(rs)
        set({ loading: false })
    },
    deleteActivity: async (token, id) => {
        const rs = await axios.delete(`http://localhost:8000/activity/delete/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(rs)
        set(state => ({
            ownList: state.ownList.filter(el => el.id !== id)
        }))
    },
    getJoinList: async (token) => {
        set({ loading: true })
        const rs = await axios.get('http://localhost:8000/activity/join', {
            headers: { Authorization: `Bearer ${token}` }
        })

        set({ joinList: rs.data.list, loading: false })
        return rs.data.data
    },
    joinActivity: async (token, id) => {
        set({ loading: true })
        const rs = await axios.post(`http://localhost:8000/activity/join/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        set({ loading: false })
        return rs.data.result
    },
    cancelJoin: async (token, id) => {
        const rs = await axios.delete(`http://localhost:8000/activity/join/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(rs.data)
        set(state => ({
            joinList: state.joinList.filter(el => el.id !== id)
        }))
        return rs.data.result
    },
    getBookmarkList: async (token) => {
        set({ loading: true })
        const rs = await axios.get('http://localhost:8000/activity/bookmark', {
            headers: { Authorization: `Bearer ${token}` }
        })
        // const time = setTimeout(() => {
        //     set({ bookmarkList: rs.data.list, loading: false })
        // }, 2000)
        // clearTimeout(time)
        set({ bookmarkList: rs.data.list, loading: false })
        return rs.data.list
    },
    bookmarkActivity: async (token, id) => {
        set({ loading: true })
        const rs = await axios.post(`http://localhost:8000/activity/bookmark/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        set({ loading: false })
        return rs.data.result
    },
    cancelBookmark: async (token, id) => {
        const rs = await axios.delete(`http://localhost:8000/activity/bookmark/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        set(state => ({
            bookmarkList: state.bookmarkList.filter(el => el.id !== id)
        }))
        return rs.data.result
    },
    search: async (text) => {
        set({ loading: true })
        const rs = await axios.get(`http://localhost:8000/activity/search?search=${text}`)
        set({ activity: rs.data.result, loading: false })
        return rs.data.result
    },
    typeSearch: async (id) => {
        set({ loading: true })
        const rs = await axios.get(`http://localhost:8000/activity/search/${id}`)
        console.log(rs)
        set({ activity: rs.data.result, loading: false })
        return rs.data.result
    }

}))

export default useActivityStore