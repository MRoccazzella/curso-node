
export async function save(db,objeto) {
    try{
        const res = await db
        .from('productos')
        .insert(objeto)
        return res
    }
    catch(e){
       console.log(e)
    }
}



export async function getAll(db) {
    try {
        const res = await db
        .from('productos')
        .select('id','titulo', 'precio', 'thumbnail')
        return res
    } catch (e) {
        console.log({e})
    }
}

export async function getById(db,id){
    try {
        const res = await db
        .from('productos')
        .select('id','titulo', 'precio', 'thumbnail')
        .where('id',id)
        return res
    } catch (e) {
        console.log({e})
    }
}
export async function deleteById(db,id){
    try {
        await db
        .from('productos')
        .where('id',id )
        .delete()
    } catch (e) {
        console.log({e})

    }
}