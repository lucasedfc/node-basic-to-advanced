import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json({ users });
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    res.status(404).json({
      message: `User with id ${id} not exists`,
    });
  } else {
    res.json(user);
  }
};
export const createUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const userExist = await User.findOne({
      where: {
        email: body.email,
      },
    });

    if (userExist) {
      return res.status(400).json({
        message: `User with email ${body.email} already exist`,
      });
    }
    const user = await User.create(body);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Internal Server Error`,
    });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const userExist = await User.findByPk(id);

    if (!userExist) {
      return res.status(404).json({
        message: `User with id ${id} not exists`,
      });
    }

    await User.update(body, {
      where: { id }});

    return res.json({
      message: 'User Updated'
      
    });
  } catch (error) {}
    res.status(500).json({
      message: `Internal Server Error`,
    });
  };
  
  
  export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    const userExist = await User.findByPk(id);
    
    if (!userExist) {
      return res.status(404).json({
        message: `User with id ${id} not exists`,
      });
    }
    
    try {
      await User.update({status: false}, {
        where: {
          id
        }
      });
      res.json({
        message: 'User Deleted',
        id,
      });
    } catch (error) {
      res.status(500).json({
        message: `Internal Server Error`,
      });      
    }

};
