import * as express from "express";
import catsRouter from './cats/cats.route'

class Server {
  public app: express.Application

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute(){
    this.app.use(catsRouter)
  }

  private setMiddleware(){

    // logging middleware
    this.app.use((req, res, next) => {
      console.log(req.rawHeaders[1]);
      console.log("이건 미들웨어");
      next();
    });

    //json middleware
    this.app.use(express.json());
    
    this.setRoute();

    // 404 middleware
    this.app.use((req, res, next) => {
      console.log("에러 미들웨어");
      res.send({ error: "404 not found error" });
    });
  }

  public listen(){

    this.setMiddleware();
    this.app.listen(8000,() => {
      console.log("localhost:");
    });

  }
}

function init (){
  const server = new Server();
  server.listen();
}

init();
