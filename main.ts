import { Application, Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";

const app = new Application();

type People = Person[];

type Person = {
  name: string;
  blocked: boolean;
};

const router = new Router();

// @ts-ignore: idk the type
router.get("/", async (ctx) => {
  const people: People = JSON.parse(await Deno.readTextFile("./people.json"));
  const name: string | null = ctx.request.url.searchParams.get("name");
  if (!name) {
    ctx.response.body = "provide name param";
    return;
  }

  for (const person of people) {
    if (name !== person.name) continue;

    if (person.blocked) {
      ctx.response.body = "yes";
      return;
    }

    ctx.response.body = "no";
    return;
  }
  ctx.response.body = "nobody found..";
});

// @ts-ignore: idk the type
router.get("/targets", async (ctx) => {
  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.body = JSON.parse(await Deno.readTextFile("./people.json"));
});

app.use(router.allowedMethods());
app.use(router.routes());

await app.listen({ port: 8000 });
