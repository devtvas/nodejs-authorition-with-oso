const { Oso, NotFoundError } = require("oso");
const { User, Repository } = require("./models");
const express = require("express");

async function start() {
  const oso = new Oso();
  oso.registerClass(User);
  oso.registerClass(Repository);
  await oso.loadFiles(["main.polar"]);

  const app = express();

  app.get("/repo/:name", async (req, res) => {
    const name = req.params.name;
    const repo = Repository.getByName(name);
    const user = User.getCurrentUser();
    //text personalization
    let text = repo.name;
    let nametoUpperCase = text.toUpperCase();
    let nameNormal = text;

    try {
      await oso.authorize(user, "read", repo);
      res.send(`<h1>A <span style="color: blue;"> ${nametoUpperCase}</span></h1><p>Welcome to repo ${nameNormal}</p>`);
    } catch (e) {
      if (e instanceof NotFoundError) {
        res.status(404);
        res.send(`<h1>Whoops!</h1><p>Repo named <span style="color: red; font-weight: bold">${name} </span>was not found</p>`);
      } else {
        throw e;
      }
    }
  });
  app.listen(5000, () => console.log("Server running on port 5000"));
}

start();
