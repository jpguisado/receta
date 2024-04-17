import axios from "axios";

type dishList = {
    name: string,
    ingredients: string[]
}[]

/**
 * Gets all dishes in database
 * @returns 
 */
export const fetchDishes = async (): Promise<dishList> => {
    const data = await axios.get<dishList>('/api/dish/read');
    return data.data;
}