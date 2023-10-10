 async function getVinos(){
    const res = fetch("http://localhost:4002/productos");
    const resJson = (await res).json();
    return resJson;
 }