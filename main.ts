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

router.post("/targets", async (ctx) => {
  type BodyStuff = {
    name: string;
    blocked: boolean;
  };

  const body: BodyStuff = await ctx.request.body().value;
  const newTarget: Person = {
    name: body.name,
    blocked: body.blocked,
  };

  const stringified: string = JSON.stringify(newTarget);
  await Deno.writeTextFile("./people.json", stringified);
  ctx.response.body = stringified;
});

// toggle if no onoff specified
router.put("/targets/:name", async (ctx) => {
  const params = await ctx.params;

  if (!params.name) {
    ctx.response.status = 401;
    ctx.response.body = "Please provide a name";
  }

  const people: People = JSON.parse(await Deno.readTextFile("./people.json"));
  const targetIndex: number = people.findIndex((p) => p.name === params.name);

  const target: Person = people[targetIndex];

  if (!params.onoff) {
    target.blocked = !target.blocked;
    ctx.response.body = target;
    return;
  }

  target.blocked = Boolean(params.onoff);
  ctx.response.body = target;
});

app.use(router.allowedMethods());
app.use(router.routes());

await app.listen({ port: 8000 });
