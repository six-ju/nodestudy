import { Cat, CatType } from "./cats.model";
import { Request, Response } from "express";

// READ 고양이 전체 데이터 다 조회
export const readAllcat = (req: Request, res: Response) => {
    try {
      const cats = Cat;
      res.status(200).send({
        success: true,
        data: {
          cats,
        },
      });
    } catch (error) {
      res.status(400).send({
        success: false,
      });
    }
  };
  
  // READ 특정 고양이 데이터 조회
  export const readCat = (req: Request, res: Response) => {
    try {
      const params = req.params;
      const cats = Cat.find((cat) => {
        return cat.id === params.id;
      });
      res.status(200).send({
        success: true,
        data: {
          cats,
        },
      });
    } catch (error) {
      res.status(400).send({
        success: false,
      });
    }
  };
  
  // CREATE 새로운 고양이 추가 api
  export const createCat = (req:Request, res:Response) => {
    try {
      const data = req.body;
      Cat.push(data); // create
      res.status(200).send({
        success: true,
        data: { data },
      });
    } catch (error) {
      res.status(400).send({
        success: false,
      });
    }
  };

  // UPDATE 고양이 데이터 업데이트 -> PUT
  export const updateCat = (req:Request, res:Response) =>{
    try {
      const params = req.params;
      const body = req.body;
      let result;
      Cat.forEach((cat)=>{
        if(cat.id === params.id){
          cat = body;
          result = cat;
        }
      })
      const cats = Cat.find((cat) => {
        return cat.id === params.id;
      });

      res.status(200).send({
        success: true,
        data: {
          cat : result,
        },
      });
    } catch (error) {
      res.status(400).send({
        success: false,
      });
    }
  }


   // UPDATE 고양이 데이터 부분적으로 업데이트 -> PATCH
   export const updatePatchCat = (req: Request, res: Response) =>{
    try {
      const params = req.params;
      const body = req.body;
      let result;
      Cat.forEach((cat)=>{
        if(cat.id === params.id){
          cat = {...cat, ...body };
          result = cat;
        }
      })
      const cats = Cat.find((cat) => {
        return cat.id === params.id;
      });

      res.status(200).send({
        success: true,
        data: {
          cat : result,
        },
      });
    } catch (error) {
      res.status(400).send({
        success: false,
      });
    }
  }

 // DELETE 고양이 데이터 삭제 -> DELETE
 export const deleteCat = (req: Request, res: Response) =>{
  try {
    const params = req.params;    
    const newCat = Cat.filter((cat) =>
      cat.id !== params.id
    )

    res.status(200).send({
      success: true,
      data:newCat
    });
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
}
