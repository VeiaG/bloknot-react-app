import localforage from "localforage";

export default class CacheService {
    books = localforage.createInstance({
        name: 'books'
    })
    notes = localforage.createInstance({
        name: 'notes'
    })
    book_set =  (key,data)=>  this.books.setItem(key,data);

    book_get = (key) => this.books.getItem(key);

    book_remove = key => this.books.removeItem(key);

    books_clear = ()=> this.books.clear();

    books_getAll = async ()=> {
        const result = [];
        await this.books.iterate((value,key,iterationNumber)=>{
            result.push(value);
        })
        return result;
    }

    notes_set =  (key,data)=>  {

        return this.notes.setItem(key,data);
    }
    notes_add =async (key,data) =>{
        return await this.notes.getItem(key).then((result)=>{
            const newList = result===null ? [] : [...result];
            newList.push(data);
            this.notes.setItem(key,newList);
        })
    }

    notes_get = (key) => this.notes.getItem(key);

    notes_remove = key => this.notes.removeItem(key);

}