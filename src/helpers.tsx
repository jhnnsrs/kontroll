import { loader } from 'graphql.macro';
import { print } from 'graphql/language/printer';


export const useGraphFile = (path: string) => {
    console.log(path)
    return print(loader(path))
}