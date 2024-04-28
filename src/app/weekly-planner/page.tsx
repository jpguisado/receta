"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import type { daySchema } from "~/lib/types/day.td"
import { dishList, dishSchema } from "~/lib/types/dish.td"
import type { mealSchema } from "~/lib/types/meals.td"
import type { oneWeekSchema, plannedDaySchema } from "~/lib/types/plannedDay.td"
import type { plannedMealSchema } from "~/lib/types/plannedMeal.td"
import { fetchDishes } from "~/server/data-layer";

export default function WeeklyPlanner() {
    
    const { data, isLoading } = useQuery({ queryKey: ['dish'], queryFn: fetchDishes })
    //const data: z.infer<typeof dishSchema> = [{name: 'Tortilla de patat', ingredients: [{name: ''}] }]

    const [day, setDay] = useState<z.infer<typeof daySchema>>();
    const [meal, setMeal] = useState<z.infer<typeof mealSchema>>();
    const [dish, setDish] = useState<z.infer<typeof dishSchema>>();
    const [plan, setPlanning] = useState<z.infer<typeof oneWeekSchema>>([
        {
            day: { name: 'MONDAY', 'order': 0 },
            mealList: [
                {
                    time: {
                        order: 0, name: 'BREAKFAST'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 2, name: 'LUNCH'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 3, name: 'DINNER'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
            ],
        }, {
            day: { name: 'TUESDAY', 'order': 1 },
            mealList: [
                {
                    time: {
                        order: 0, name: 'BREAKFAST'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 2, name: 'LUNCH'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 3, name: 'DINNER'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
            ],
        }, {
            day: { name: 'WEDNESDAY', 'order': 2 },
            mealList: [
                {
                    time: {
                        order: 0, name: 'BREAKFAST'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 2, name: 'LUNCH'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 3, name: 'DINNER'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
            ],
        }, {
            day: { name: 'THURSDAY', 'order': 3 },
            mealList: [
                {
                    time: {
                        order: 0, name: 'BREAKFAST'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 2, name: 'LUNCH'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 3, name: 'DINNER'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
            ],
        }, {
            day: { name: 'FRIDAY', 'order': 4 },
            mealList: [
                {
                    time: {
                        order: 0, name: 'BREAKFAST'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 2, name: 'LUNCH'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 3, name: 'DINNER'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
            ],
        }, {
            day: { name: 'SATURDAY', 'order': 5 },
            mealList: [
                {
                    time: {
                        order: 0, name: 'BREAKFAST'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 2, name: 'LUNCH'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 3, name: 'DINNER'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
            ],
        }, {
            day: { name: 'SUNDAY', 'order': 6 },
            mealList: [
                {
                    time: {
                        order: 0, name: 'BREAKFAST'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 2, name: 'LUNCH'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 3, name: 'DINNER'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
            ],
        }
    ])

    /**
     * Keeps in place all the days and the meals (Monday to Sunday - Breakfast to dinner)
     * @param updatedPlan the plan we are going to sort
     */
    const sortDaysAnMeals = (updatedPlan: z.infer<typeof oneWeekSchema>) => {
        updatedPlan.sort((a, b) => a.day.order - b.day.order);
        updatedPlan.forEach((day) => {
            day.mealList.sort((a, b) => a.time.order - b.time.order)
        })
    }

    /**
     * Adds a day to plan
     * @param paramDay the day that we are creating or updating
     * @param paramMeal the meal that we are creating or updating
     * @param newDish the dish that ware adding to the meal
     */
    const addDayToPlan = (paramDay: z.infer<typeof daySchema>, paramMeal: z.infer<typeof mealSchema>, newDish: z.infer<typeof dishSchema>) => {
        const planToUpdate: z.infer<typeof oneWeekSchema> = structuredClone(plan);
        const plannedDay = planToUpdate.find(day => day.day.name === paramDay.name);
        if (plannedDay) {
            addMealToDay(plannedDay, paramMeal, newDish);
        } else {
            planToUpdate.push({ day: paramDay, mealList: [{ time: paramMeal, dishList: [newDish] }] })
        }
        sortDaysAnMeals(planToUpdate);
        setPlanning(planToUpdate);
    }

    /**
     * Adds a meal to a day
     * @param plannedMeals 
     * @param paramMeal 
     * @param newDish 
     */
    const addMealToDay = (plannedMeals: z.infer<typeof plannedDaySchema>, paramMeal: z.infer<typeof mealSchema>, newDish: z.infer<typeof dishSchema>) => {
        const meal = plannedMeals.mealList.find(meal => meal.time.name === paramMeal.name);

        if (meal) { // Esto nunca va a ser true porque no puede comprobar la igualdad
            addDishToMeal(meal, newDish)
            // Si no existe la comida
        } else {
            plannedMeals.mealList.push({ time: paramMeal, dishList: [newDish] })
        }
    }

    /**
     * Adds a new dish to a meal
     * @param meal the meal we are updating with the dish
     * @param newDish the dish we are adding
     * @returns 
     */
    const addDishToMeal = (meal: z.infer<typeof plannedMealSchema>, newDish: z.infer<typeof dishSchema>) => {
        const dish = newDish
        meal.dishList.splice(0, 1, dish)
    }

    const saveWeeklyPlan = () => {
        console.log(plan)
    }


    return (
        <div className="gap-4 flex flex-col">
            <div className="text-xl">Semana 1</div>
            <div className="flex justify-around">
                <Button onClick={() => setDay({ name: 'MONDAY', order: 0 })} className={`flex border hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 justify-center items-center ${day?.name === 'MONDAY' ? 'bg-slate-400' : ''}`}>L</Button>
                <Button onClick={() => setDay({ name: 'TUESDAY', order: 1 })} className={`flex border hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 justify-center items-center ${day?.name === 'TUESDAY' ? 'bg-slate-400' : ''}`}>M</Button>
                <Button onClick={() => setDay({ name: 'WEDNESDAY', order: 2 })} className={`flex border hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 justify-center items-center ${day?.name === 'WEDNESDAY' ? 'bg-slate-400' : ''}`}>X</Button>
                <Button onClick={() => setDay({ name: 'THURSDAY', order: 3 })} className={`flex border hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 justify-center items-center ${day?.name === 'THURSDAY' ? 'bg-slate-400' : ''}`}>J</Button>
                <Button onClick={() => setDay({ name: 'FRIDAY', order: 4 })} className={`flex border hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 justify-center items-center ${day?.name === 'FRIDAY' ? 'bg-slate-400' : ''}`}>V</Button>
                <Button onClick={() => setDay({ name: 'SATURDAY', order: 5 })} className={`flex border hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 justify-center items-center ${day?.name === 'SATURDAY' ? 'bg-slate-400' : ''}`}>S</Button>
                <Button onClick={() => setDay({ name: 'SUNDAY', order: 6 })} className={`flex border hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 justify-center items-center ${day?.name === 'SUNDAY' ? 'bg-slate-400' : ''}`}>D</Button>
            </div>

            <div className="flex gap-5 justify-around">
                <Button variant={"ghost"} onClick={() => setMeal({ name: 'BREAKFAST', order: 0 })} className={`flex w-full border hover:bg-slate-300 transition-colors duration-200 justify-center items-center ${meal?.name === 'BREAKFAST' ? 'bg-slate-400' : ''}`}>BREAKFAST</Button>
                <Button variant={"ghost"} onClick={() => setMeal({ name: 'MIDMORNING', order: 1 })} className={`flex w-full border hover:bg-slate-300 transition-colors duration-200 justify-center items-center ${meal?.name === 'MIDMORNING' ? 'bg-slate-400' : ''}`}>MIDMORNING</Button>
                <Button variant={"ghost"} onClick={() => setMeal({ name: 'LUNCH', order: 2 })} className={`flex w-full border hover:bg-slate-300 transition-colors duration-200 justify-center items-center ${meal?.name === 'LUNCH' ? 'bg-slate-400' : ''}`}>LUNCH</Button>
                <Button variant={"ghost"} onClick={() => setMeal({ name: 'DINNER', order: 3 })} className={`flex w-full border hover:bg-slate-300 transition-colors duration-200 justify-center items-center ${meal?.name === 'DINNER' ? 'bg-slate-400' : ''}`}>DINNER</Button>
                <Button variant={"ghost"} onClick={() => setMeal({ name: 'SNACK', order: 4 })} className={`flex w-full border hover:bg-slate-300 transition-colors duration-200 justify-center items-center ${meal?.name === 'SNACK' ? 'bg-slate-400' : ''}`}>SNACK</Button>
                <Button variant={"ghost"} onClick={() => setMeal({ name: 'COMPLEMENTARY', order: 5 })} className={`flex w-full border hover:bg-slate-300 transition-colors duration-200 justify-center items-center ${meal?.name === 'COMPLEMENTARY' ? 'bg-slate-400' : ''}`}>COMPLEMENTARY</Button>
            </div>

            <Select onValueChange={(e: z.infer<typeof dishSchema>) => { setDish(e) }}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona el plato" />
                </SelectTrigger>
                <SelectContent>
                    {isLoading ? 'estoy cargando' : 'ya he cargado'}
                    {/* {data!.map((dish) => {
                        return (
                            <SelectItem key={dish.name} value={dish}>{dish.name}</SelectItem>
                        )
                    })} */}
                </SelectContent>
            </Select>

            <Button onClick={() => addDayToPlan(day!, meal!, dish!)}>Añadir</Button>

            <Table className="leading-none">
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Día</TableHead>
                        <TableHead className="">Desayuno</TableHead>
                        <TableHead className="">Almuerzo</TableHead>
                        <TableHead className="">Cena</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {plan.map(day => {
                        return (
                            <TableRow key={day.day.name} className="">
                                <TableCell className="font-medium">{day.day.name}</TableCell>
                                {
                                    day.mealList.map((meals) => {
                                        return meals.dishList.map(dishes => {
                                            return <TableCell key={dishes.name} className="font-medium">{dishes.name}</TableCell>
                                        })
                                    })
                                }
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <Button onClick={() => saveWeeklyPlan()}>Guardar planificación</Button>
        </div>
    )
}