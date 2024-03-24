import * as express from "express";

const app: express.Express = express();

const port: number = 8000;

app.get("/", (req: express.Request, res: express.Response) => {
  res.send({ name: "yook", age: 27, location: ["구리", "남양주", "별내"] });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
