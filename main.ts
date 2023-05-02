import { Application } from "https://deno.land/x/oak@v12.4.0/mod.ts";

const app = new Application();

type People = Person[];

type Person = {
  name: string;
  blocked: boolean;
};

app.use(async (ctx) => {
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

await app.listen({ port: 8000 });
