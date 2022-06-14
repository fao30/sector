const { User } = require("../models");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { passHelper, jwtHelper, pagination } = require("../helper/helper");


class Controller {
  static async Login(req, res, next) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (user && passHelper.checkPass(password, user.password)) {
        let tokenPayload = { id: user.id, email: user.email, role: user.role };
        let access_token = jwtHelper.signPl(tokenPayload);

        res.status(200).json({
          id: user.id,
          email: user.email,
          role: user.role,
          access_token: access_token,
        });
      } else {
        throw { name: "unauthorized", message: "You dont have an access" };
      }
    } catch (err) {
      console.log(err);
      next(error);
    }
  }

  static async Register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      let createUser = await User.create(
        {
          name,
          email, 
          password: passHelper.hashPassword(password),
        });
      if (createUser) {
        res.status(201).json({
          id: createUser.id,
          name: createUser.name,
          email: createUser.email,
        });
      }
      res.status(200).json(response);
    } catch (err) {
      res.status(401).json(err.errors[0].message || 'bad request');
    }
  }

  static async EditProfile(req, res, next) {
    try { 
      const { id }=req.params
      const { name, lastName, email, gender} = req.body
      const {id: idLogin}=req.user

      let files = req.files.upload;
      let fileName = ''
      
      if(files){
        if(files.size > 1000000){
          throw { name: "Error", message: "Photo size is too big" };
        }else{
          fileName = `/uploads/${+req.params.id}.jpeg`
          if(req.files.upload.mimetype === 'image/jpeg'){
            files.mv(`.${fileName}.jpeg`);
          }else{
            files.mv(`.${fileName}.png`); 
          }
        }
      }
      

      const updateItems = {
        name,
        lastName,
        email,
        gender,
        photo: fileName ? fileName : ''
      }

      if(+id !== idLogin){
        throw { name: "unauthorized", message: "You dont have an access to edit this user, please login first" };
      }
      
       await User.update(updateItems,{
        where: {id}
      });

      res.status(200).json(`Succesfully updated id ${id}`);
    } catch (err) {
      next(err);
    }
  }
  
  static async GetAllUser(req, res, next) {
    try {
      const { page } = req.query

      const { limit, offset } = pagination.getPagination(page);

      let data = await User.findAndCountAll({ order: [['createdAt', 'ASC']], limit, offset, attributes: { exclude: ['password','updatedAt'] } });
      const response = pagination.getPagingData(data, page, limit);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async GetUser(req, res, next) {
    try {
      const { id } = req.params

      let response = await User.findAll({
        attributes: { exclude: ['password','updatedAt'] },
        where: {id},
      });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

}

module.exports = Controller;
