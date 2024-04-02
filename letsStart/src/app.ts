import * as express from "express";
import { Cat, CatType } from "./app.model";

const app: express.Express = express();

const port: number = 8000;

// logging middleware
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("이건 미들웨어");
  next();
});

//json middleware
app.use(express.json());

// READ 고양이 전체 데이터 다 조회
app.get("/cats", (req: express.Request, res: express.Response) => {
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
      error: error.message,
    });
  }
});

// READ 특정 고양이 데이터 조회
app.get("/cats/:id", (req: express.Request, res: express.Response) => {
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
      error: error.message,
    });
  }
});

// CREATE 새로운 고양이 추가 api
app.post("/cats/:id", (req, res) => {
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
      error: error.message,
    });
  }
});

// 404 middleware
app.use((req, res) => {
  console.log("에러 미들웨어");
  res.send({ error: "404 not found error" });
});

app.listen(port, () => {
  console.log("localhost:" + port);
});
