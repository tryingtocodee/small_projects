import {create} from "zustand"
import axios from "axios"

interface Signup {
    username : string ,
    email : string ,
    password : string
}

interface Login {
    email : string ,
    password : string
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useUserStore = create((set : any)=>({
    user : null,
    loading : false ,
   
    signup : async({username , email , password } : Signup)  => {
        set({loading : true})

        try {
            const res = await axios.post("http://localhost:4000/api/auth/signup" , {username , email , password})
            console.log(res)
            set({user : res , loading : false})
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error :any) {
            
            console.log("error in sign up zustand" , error.message)
        }
    } ,

    login : async ({email , password} : Login)=>{
        set({loading : true})
        try {
            const res = await axios.post("http://localhost:4000/api/auth/login" , { email , password})
            set({user : res , loading : false})
            console.log(res)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error : any) {
            console.log("error in login zustand" , error.messasge)
            set({user : null , loading : false})
            
        }
    },
    checkAuth : async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/auth/profile" , {
                withCredentials:true,
            })
            console.log(res)
            set({user : res})
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error : any) {
            console.log("error in check auth zustand" , error.message)
            set({user:null})
        }
    }

}))


export default useUserStore