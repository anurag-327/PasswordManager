import ls from "localstorage-slim" 
export function setToken(token)
{
    ls.set('vault',token,{ttl:86400,encrypt:true})
}
export function getToken()
{
    return(ls.get('vault',{decrypt:true}))
}
export function removeToken()
{
    ls.remove('vault');
}