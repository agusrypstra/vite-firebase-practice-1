import {defineStore} from 'pinia'

export  const useUserStore = defineStore('userStore',{
    state: ()=>{
        return{
            userData: "AgustinJajaja"
        }
    },
    getters: {
        mayuscula(state){
            return state.userData.toUpperCase()
        },
        minuscula(state){
            return state.userData.toLowerCase()
        }
    },
    actions:{
        registerUser(name){
            this.userData = name;
        }
    }
})