import { Request, Response } from "express";
import { getUserRepo, createUserRepo, updateUserRepo, deleteUserRepo } from "../repository/user.repository";

import { IUserInterface } from "../database/interfaces/user.interface";
import { error, log } from "console";


export const getUserController = async (req: Request, res: Response) => {
    const userId = req.params.userId as string;
    console.log(userId);
    try {
        const user = await getUserRepo(userId)
        if (user) {
            res.status(200).json({ data: user });
        } else {
            res.status(500).json({ error: " User not found" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });

    }
}

export const createUserController = async (req: Request, res: Response) => {
    const user: IUserInterface = req.body;
    console.log(user);

    try {
        const success = await createUserRepo(user);
        if (success) {
            res.status(200).json({ data: user });
        } else {
            res.status(404).json({ error: " User not Created" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });

    }
}
export const updateUserController = async (req: Request, res: Response) => {
    const updatedUser: IUserInterface = req.body;

    try {
        const success = await updateUserRepo(updatedUser.uid, updatedUser);
        if (success) {
            res.status(200).json({ data: "user updated " });
        } else {
            res.status(404).json({ error: " User not updated" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });

    }
}
export const deleteUserController = async (req: Request, res: Response) => {
    const userId = req.params.userId as string;
    console.log(userId);
    try {
        const success = await deleteUserRepo(userId);
        if (success) {
            res.status(200).json({ data: "user deleted " });
        } else {
            res.status(500).json({ error: " User not deleted" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });

    }
}