import * as SecureStore from 'expo-secure-store';



async function set(key, object){
    try {
        await SecureStore.setItemAsync(key, JSON.stringify(object))
    }
    catch (error){
        console.log('SecureStore.set: ', error)
    }
}

async function get(key){
    try{
        data = await SecureStore.getItemAsync(key)
        if (data !== undefined){
            return JSON.parse(data)
        }

    }
    catch (error){
        console.log('SecureStore.get: ', error)
    }
}

async function remove(key){
    try {
        await SecureStore.deleteItemAsync(key)
    }
    catch (error){
        console.loglog('SecureStore.remove: ',error)
    }
}

async function wipe(){
    try{
        await SecureStore.wipe()()
    }catch (error){
        console.log('SecureStore.wipe: ',error)
    }
}

export default {set, get, remove, wipe}